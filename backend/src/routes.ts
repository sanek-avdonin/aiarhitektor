import { Router, Request, Response } from 'express';
import pool from './database';

const router = Router();

// ===== ПРОЕКТЫ =====

// Получить все проекты
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении проектов' });
  }
});

// Создать новый проект
router.post('/projects', async (req: Request, res: Response) => {
  const { name, description, team_size } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, description, team_size) VALUES ($1, $2, $3) RETURNING *',
      [name, description, team_size || 1]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании проекта' });
  }
});

// Получить проект по ID
router.get('/projects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Проект не найден' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении проекта' });
  }
});

// Обновить проект
router.put('/projects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status, team_size } = req.body;
  try {
    const result = await pool.query(
      'UPDATE projects SET name=$1, description=$2, status=$3, team_size=$4, updated_at=NOW() WHERE id=$5 RETURNING *',
      [name, description, status, team_size, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Проект не найден' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении проекта' });
  }
});

// Удалить проект
router.delete('/projects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Проект не найден' });
    res.json({ message: 'Проект удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении проекта' });
  }
});

// ===== ЗАДАЧИ =====

// Получить все задачи проекта
router.get('/projects/:projectId/tasks', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении задач' });
  }
});

// Создать новую задачу
router.post('/projects/:projectId/tasks', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { title, description, priority, assignee } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (project_id, title, description, priority, assignee) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [projectId, title, description, priority || 'medium', assignee]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании задачи' });
  }
});

// Обновить задачу
router.put('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, priority, assignee } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title=$1, description=$2, status=$3, priority=$4, assignee=$5, updated_at=NOW() WHERE id=$6 RETURNING *',
      [title, description, status, priority, assignee, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Задача не найдена' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении задачи' });
  }
});

// ===== РИСКИ =====

// Получить все риски проекта
router.get('/projects/:projectId/risks', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM risks WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении рисков' });
  }
});

// Создать новый риск
router.post('/projects/:projectId/risks', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { title, description, probability, impact, mitigation_plan } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO risks (project_id, title, description, probability, impact, mitigation_plan) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [projectId, title, description, probability, impact, mitigation_plan]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании риска' });
  }
});

// ===== ЗДОРОВЬЕ =====

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

export default router;
