import { Router, Request, Response } from 'express';
import pool from './database';

const router = Router();

// ===== PROJECTS =====

// Get all projects
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Create new project
router.post('/projects', async (req: Request, res: Response) => {
  const { name, description, team_size } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, description, team_size) VALUES ($1, $2, $3) RETURNING *',
      [name, description, team_size || 1]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Get project by ID
router.get('/projects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error: any) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Error fetching project' });
  }
});

// Update project
router.put('/projects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status, team_size } = req.body;
  try {
    const result = await pool.query(
      'UPDATE projects SET name = $1, description = $2, status = $3, team_size = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [name, description, status, team_size, id]
    );
    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

// Delete project
router.delete('/projects/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ message: 'Project deleted' });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
});

// ===== HEALTH =====

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

export default router;
