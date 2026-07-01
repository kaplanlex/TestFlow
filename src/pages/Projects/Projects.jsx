import { useMemo, useState } from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import styles from "./Projects.module.css";
import { useAppContext } from "../../context/AppContext";

const PROJECT_STATUSES = [
  {
    value: "Активен",
    label: "Активен",
  },
  {
    value: "На паузе",
    label: "На паузе",
  },
  {
    value: "Завершен",
    label: "Завершен",
  },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "Активен",
};

function Projects() {
  const { projects, addProject, updateProject, deleteProject } =
    useAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const filteredProjects = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    if (!normalizedSearchQuery) {
      return projects;
    }

    return projects.filter((project) => {
      const projectTitle = String(project.title || "").toLowerCase();

      return projectTitle.includes(normalizedSearchQuery);
    });
  }, [projects, searchQuery]);

  function openCreateModal() {
    setEditingProject(null);
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsModalOpen(true);
  }

  function openEditModal(project) {
    setEditingProject(project);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      status: project.status || "Активен",
    });

    setErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData(EMPTY_FORM);
    setErrors({});
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Введите название проекта";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }

    closeModal();
  }

  function handleDeleteProject(project) {
    const isConfirmed = window.confirm(
      `Вы действительно хотите удалить проект "${project.title}"?`,
    );

    if (isConfirmed) {
      deleteProject(project.id);
    }
  }

  const hasProjects = projects.length > 0;
  const hasFilteredProjects = filteredProjects.length > 0;

  return (
    <section className={styles.projects}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Проекты</h1>

          <p className={styles.pageDescription}>
            Создавайте проекты, управляйте их статусами и отслеживайте работу
            команды тестирования.
          </p>
        </div>

        <Button variant="primary" onClick={openCreateModal}>
          Новый проект
        </Button>
      </div>

      <div className={styles.toolbar}>
        <Input
          label="Поиск по названию"
          name="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Например: Интернет-магазин"
        />
      </div>

      {!hasProjects && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>PR</div>

          <h2 className={styles.emptyTitle}>Проекты пока не созданы</h2>

          <p className={styles.emptyText}>
            Создайте первый проект, чтобы начать вести тест-кейсы, чек-листы и
            баг-репорты.
          </p>

          <Button variant="primary" onClick={openCreateModal}>
            Создать проект
          </Button>
        </div>
      )}

      {hasProjects && !hasFilteredProjects && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>?</div>

          <h2 className={styles.emptyTitle}>Ничего не найдено</h2>

          <p className={styles.emptyText}>
            По вашему поисковому запросу проектов нет. Попробуйте изменить
            название в строке поиска.
          </p>
        </div>
      )}

      {hasFilteredProjects && (
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <article className={styles.projectCard} key={project.id}>
              <div className={styles.cardTop}>
                <div>
                  <h2 className={styles.projectTitle}>{project.title}</h2>

                  <p className={styles.createdAt}>
                    Создан: {project.createdAt || "дата не указана"}
                  </p>
                </div>

                <StatusBadge value={project.status} />
              </div>

              <p className={styles.projectDescription}>
                {project.description || "Описание проекта не добавлено."}
              </p>

              <div className={styles.cardActions}>
                <Button
                  variant="warning"
                  onClick={() => openEditModal(project)}
                >
                  Редактировать
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDeleteProject(project)}
                >
                  Удалить
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <h2 id="project-modal-title" className={styles.modalTitle}>
                  {editingProject ? "Редактировать проект" : "Новый проект"}
                </h2>

                <p className={styles.modalDescription}>
                  Заполните данные проекта и сохраните изменения.
                </p>
              </div>

              <button
                className={styles.closeButton}
                type="button"
                onClick={closeModal}
                aria-label="Закрыть модальное окно"
              >
                ×
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                label="Название"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Например: TestFlow Web"
                error={errors.title}
              />

              <div className={styles.field}>
                <label className={styles.label} htmlFor="project-description">
                  Описание
                </label>

                <textarea
                  id="project-description"
                  className={styles.textarea}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Кратко опишите цель проекта"
                  rows="5"
                />
              </div>

              <Select
                label="Статус"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={PROJECT_STATUSES}
              />

              <div className={styles.modalActions}>
                <Button variant="secondary" type="button" onClick={closeModal}>
                  Отмена
                </Button>

                <Button variant="primary" type="submit">
                  {editingProject ? "Сохранить" : "Создать"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
