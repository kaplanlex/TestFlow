import { useMemo, useState } from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import styles from "./Bugs.module.css";
import { useAppContext } from "../../context/AppContext";

const PRIORITIES = ["Низкий", "Средний", "Высокий", "Критический"];

const SEVERITIES = ["Низкая", "Средняя", "Высокая", "Блокирующая"];

const BUG_STATUSES = ["Открыт", "В работе", "Исправлен", "Закрыт"];

const EMPTY_FORM = {
  title: "",
  projectId: "",
  description: "",
  steps: "",
  actualResult: "",
  expectedResult: "",
  priority: "Средний",
  severity: "Средняя",
  status: "Открыт",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function Bugs() {
  const { projects, bugs, addBug, updateBug, deleteBug } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBug, setEditingBug] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const projectNameById = useMemo(() => {
    return projects.reduce((accumulator, project) => {
      accumulator[project.id] = project.title || project.name || "Без названия";
      return accumulator;
    }, {});
  }, [projects]);

  const filteredBugs = useMemo(() => {
    const normalizedSearchQuery = normalizeText(searchQuery);

    return bugs.filter((bug) => {
      const bugTitle = normalizeText(bug.title);
      const bugProjectId = bug.projectId || "";
      const bugStatus = normalizeText(bug.status);
      const bugPriority = normalizeText(bug.priority);

      const matchesSearch =
        !normalizedSearchQuery || bugTitle.includes(normalizedSearchQuery);

      const matchesProject =
        projectFilter === "all" || bugProjectId === projectFilter;

      const matchesStatus =
        statusFilter === "all" || bugStatus === normalizeText(statusFilter);

      const matchesPriority =
        priorityFilter === "all" ||
        bugPriority === normalizeText(priorityFilter);

      return (
        matchesSearch && matchesProject && matchesStatus && matchesPriority
      );
    });
  }, [bugs, searchQuery, projectFilter, statusFilter, priorityFilter]);

  function openCreateModal() {
    setEditingBug(null);

    setFormData({
      ...EMPTY_FORM,
      projectId: projects[0]?.id || "",
    });

    setErrors({});
    setIsModalOpen(true);
  }

  function openEditModal(bug) {
    setEditingBug(bug);

    setFormData({
      title: bug.title || "",
      projectId: bug.projectId || "",
      description: bug.description || "",
      steps: bug.steps || "",
      actualResult: bug.actualResult || "",
      expectedResult: bug.expectedResult || "",
      priority: bug.priority || "Средний",
      severity: bug.severity || "Средняя",
      status: bug.status || "Открыт",
    });

    setErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingBug(null);
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
      newErrors.title = "Введите название бага";
    }

    if (!formData.projectId) {
      newErrors.projectId = "Выберите проект";
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

    const bugData = {
      title: formData.title.trim(),
      projectId: formData.projectId,
      description: formData.description.trim(),
      steps: formData.steps.trim(),
      actualResult: formData.actualResult.trim(),
      expectedResult: formData.expectedResult.trim(),
      priority: formData.priority,
      severity: formData.severity,
      status: formData.status,
    };

    if (editingBug) {
      updateBug(editingBug.id, bugData);
    } else {
      addBug(bugData);
    }

    closeModal();
  }

  function handleDeleteBug(bug) {
    const isConfirmed = window.confirm(
      `Вы действительно хотите удалить баг "${bug.title}"?`,
    );

    if (isConfirmed) {
      deleteBug(bug.id);
    }
  }

  function resetFilters() {
    setSearchQuery("");
    setProjectFilter("all");
    setStatusFilter("all");
    setPriorityFilter("all");
  }

  const hasBugs = bugs.length > 0;
  const hasFilteredBugs = filteredBugs.length > 0;
  const hasProjects = projects.length > 0;

  return (
    <section className={styles.bugs}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Баг-репорты</h1>

          <p className={styles.pageDescription}>
            Создавайте, фильтруйте и отслеживайте дефекты по проектам,
            приоритетам и статусам.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={openCreateModal}
          disabled={!hasProjects}
        >
          Новый баг
        </Button>
      </div>

      {!hasProjects && (
        <div className={styles.warningBox}>
          Чтобы создать баг-репорт, сначала добавьте хотя бы один проект на
          странице проектов.
        </div>
      )}

      <div className={styles.filtersPanel}>
        <Input
          label="Поиск по названию"
          name="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Например: ошибка авторизации"
        />

        <div className={styles.filterField}>
          <label className={styles.filterLabel} htmlFor="project-filter">
            Проект
          </label>

          <select
            id="project-filter"
            className={styles.filterSelect}
            value={projectFilter}
            onChange={(event) => setProjectFilter(event.target.value)}
          >
            <option value="all">Все проекты</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title || "Без названия"}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterField}>
          <label className={styles.filterLabel} htmlFor="status-filter">
            Статус
          </label>

          <select
            id="status-filter"
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">Все статусы</option>

            {BUG_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterField}>
          <label className={styles.filterLabel} htmlFor="priority-filter">
            Приоритет
          </label>

          <select
            id="priority-filter"
            className={styles.filterSelect}
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="all">Все приоритеты</option>

            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.resetButtonWrapper}>
          <Button variant="secondary" onClick={resetFilters}>
            Сбросить
          </Button>
        </div>
      </div>

      {!hasBugs && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>BG</div>

          <h2 className={styles.emptyTitle}>Баги пока не добавлены</h2>

          <p className={styles.emptyText}>
            Создайте первый баг-репорт, чтобы начать отслеживать дефекты
            проекта.
          </p>

          <Button
            variant="primary"
            onClick={openCreateModal}
            disabled={!hasProjects}
          >
            Создать баг
          </Button>
        </div>
      )}

      {hasBugs && !hasFilteredBugs && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>?</div>

          <h2 className={styles.emptyTitle}>Баги не найдены</h2>

          <p className={styles.emptyText}>
            По текущим фильтрам ничего не найдено. Попробуйте изменить параметры
            поиска.
          </p>

          <Button variant="secondary" onClick={resetFilters}>
            Сбросить фильтры
          </Button>
        </div>
      )}

      {hasFilteredBugs && (
        <div className={styles.bugList}>
          {filteredBugs.map((bug) => (
            <details className={styles.bugCard} key={bug.id} open>
              <summary className={styles.bugSummary}>
                <div className={styles.summaryMain}>
                  <h2 className={styles.bugTitle}>
                    {bug.title || "Без названия"}
                  </h2>

                  <p className={styles.bugProject}>
                    Проект:{" "}
                    {projectNameById[bug.projectId] || "Проект не найден"}
                  </p>
                </div>

                <div className={styles.summaryBadges}>
                  <StatusBadge value={bug.priority || "Средний"} />
                  <StatusBadge value={bug.status || "Открыт"} />
                </div>
              </summary>

              <div className={styles.bugBody}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Дата создания</span>
                    <strong className={styles.infoValue}>
                      {bug.createdAt || "дата не указана"}
                    </strong>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Серьезность</span>
                    <strong className={styles.infoValue}>
                      {bug.severity || "Средняя"}
                    </strong>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Приоритет</span>
                    <StatusBadge value={bug.priority || "Средний"} />
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Статус</span>
                    <StatusBadge value={bug.status || "Открыт"} />
                  </div>
                </div>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailBlock}>
                    <h3 className={styles.detailTitle}>Описание</h3>

                    <p className={styles.detailText}>
                      {bug.description || "Описание не добавлено."}
                    </p>
                  </div>

                  <div className={styles.detailBlock}>
                    <h3 className={styles.detailTitle}>
                      Шаги для воспроизведения
                    </h3>

                    <p className={styles.detailText}>
                      {bug.steps || "Шаги не указаны."}
                    </p>
                  </div>

                  <div className={styles.detailBlock}>
                    <h3 className={styles.detailTitle}>
                      Фактический результат
                    </h3>

                    <p className={styles.detailText}>
                      {bug.actualResult || "Фактический результат не указан."}
                    </p>
                  </div>

                  <div className={styles.detailBlock}>
                    <h3 className={styles.detailTitle}>Ожидаемый результат</h3>

                    <p className={styles.detailText}>
                      {bug.expectedResult || "Ожидаемый результат не указан."}
                    </p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <Button variant="warning" onClick={() => openEditModal(bug)}>
                    Редактировать
                  </Button>

                  <Button variant="danger" onClick={() => handleDeleteBug(bug)}>
                    Удалить
                  </Button>
                </div>
              </div>
            </details>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bug-modal-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <h2 id="bug-modal-title" className={styles.modalTitle}>
                  {editingBug ? "Редактировать баг" : "Новый баг"}
                </h2>

                <p className={styles.modalDescription}>
                  Заполните данные баг-репорта и сохраните изменения.
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
                placeholder="Например: кнопка входа не работает"
                error={errors.title}
              />

              <div className={styles.field}>
                <label className={styles.label} htmlFor="bug-project">
                  Проект
                </label>

                <select
                  id="bug-project"
                  className={`${styles.select} ${
                    errors.projectId ? styles.selectError : ""
                  }`}
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Выберите проект
                  </option>

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title || "Без названия"}
                    </option>
                  ))}
                </select>

                {errors.projectId && (
                  <p className={styles.error}>{errors.projectId}</p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="bug-description">
                  Описание
                </label>

                <textarea
                  id="bug-description"
                  className={styles.textarea}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Кратко опишите проблему"
                  rows="4"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="bug-steps">
                  Шаги для воспроизведения
                </label>

                <textarea
                  id="bug-steps"
                  className={styles.textarea}
                  name="steps"
                  value={formData.steps}
                  onChange={handleInputChange}
                  placeholder="1. Открыть страницу&#10;2. Нажать кнопку&#10;3. Получить ошибку"
                  rows="5"
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bug-actual-result">
                    Фактический результат
                  </label>

                  <textarea
                    id="bug-actual-result"
                    className={styles.textarea}
                    name="actualResult"
                    value={formData.actualResult}
                    onChange={handleInputChange}
                    placeholder="Что происходит фактически"
                    rows="4"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bug-expected-result">
                    Ожидаемый результат
                  </label>

                  <textarea
                    id="bug-expected-result"
                    className={styles.textarea}
                    name="expectedResult"
                    value={formData.expectedResult}
                    onChange={handleInputChange}
                    placeholder="Что должно происходить"
                    rows="4"
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bug-priority">
                    Приоритет
                  </label>

                  <select
                    id="bug-priority"
                    className={styles.select}
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    {PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bug-severity">
                    Серьезность
                  </label>

                  <select
                    id="bug-severity"
                    className={styles.select}
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                  >
                    {SEVERITIES.map((severity) => (
                      <option key={severity} value={severity}>
                        {severity}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bug-status">
                    Статус
                  </label>

                  <select
                    id="bug-status"
                    className={styles.select}
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {BUG_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.modalActions}>
                <Button variant="secondary" type="button" onClick={closeModal}>
                  Отмена
                </Button>

                <Button variant="primary" type="submit">
                  {editingBug ? "Сохранить" : "Создать"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Bugs;
