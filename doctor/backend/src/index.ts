import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Helper function to read JSON files
const readJsonFile = (filename: string) => {
  const filePath = join(__dirname, '../../../data', filename);
  return JSON.parse(readFileSync(filePath, 'utf-8'));
};

// Helper function to write JSON files
const writeJsonFile = (filename: string, data: any) => {
  const filePath = join(__dirname, '../../../data', filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// API Routes
// Get all doctors
app.get('/api/doctors', ((req: Request, res: Response) => {
  try {
    const doctors = readJsonFile('doctor.json');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  } 
}) as RequestHandler
);

// Get doctor by ID
app.get('/api/doctors/:id', ((req: Request, res: Response) => {
  try {
    const doctors = readJsonFile('doctor.json');
    const doctor = doctors.find((d: any) => d.id === req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
}) as RequestHandler
);

// Get all patients
app.get('/api/patients', ((req: Request, res: Response) => {
  try {
    const patients = readJsonFile('patient.json');
    console.log('Successfully fetched patients:', {
      count: patients.length,
      path: join(__dirname, '../../../data', 'patient.json')
    });
    res.json(patients);
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
}) as RequestHandler
);

// Get patient by ID
app.get('/api/patients/:id', ((req: Request, res: Response) => {
  try {
    const patients = readJsonFile('patient.json');
    const patient = patients.find((p: any) => p.id === req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
}) as RequestHandler
);

// Get prescriptions by patient ID
app.get('/api/prescriptions/patient/:patientId', ((req: Request, res: Response) => {
  try {
    const prescriptions = readJsonFile('prescription.json');
    const patientPrescriptions = prescriptions.filter(
      (p: any) => p.patientId === req.params.patientId
    );
    res.json(patientPrescriptions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
}) as RequestHandler
);

// Get sessions by patient ID
app.get('/api/sessions/patient/:patientId', ((req: Request, res: Response) => {
  try {
    const sessions = readJsonFile('session.json');
    const patientSessions = sessions.filter(
      (s: any) => s.patientId === req.params.patientId
    );
    res.json(patientSessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
}) as RequestHandler
);

// Add endpoint to get patient's latest session
app.get('/api/sessions/patient/:patientId/latest', ((req: Request, res: Response) => {
  try {
    const sessions = readJsonFile('session.json');
    const patientSessions = sessions
      .filter((s: any) => s.patientId === req.params.patientId)
      .sort((a: any, b: any) => new Date(b.feedback?.reviewDate || 0).getTime() - 
                                new Date(a.feedback?.reviewDate || 0).getTime());
    
    res.json(patientSessions[0] || null);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest session' });
  }
}) as RequestHandler
);

// Add endpoint to get session metrics
app.get('/api/sessions/:sessionId/metrics', ((req: Request, res: Response) => {
  try {
    const sessions = readJsonFile('session.json');
    const session = sessions.find((s: any) => s.id === req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session.metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session metrics' });
  }
}) as RequestHandler
);

// Get exercise by ID
app.get('/api/exercises/:id', ((req: Request, res: Response) => {
  try {
    const exercises = readJsonFile('exercise.json');
    const exercise = exercises.find((e: any) => e.id === req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
}) as RequestHandler
);

// Add new endpoint to get all exercises
app.get('/api/exercises', (req: Request, res: Response) => {
  try {
    const exercises = readJsonFile('exercise.json');
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Add new endpoint to get all sessions
app.get('/api/allsessions', ((req: Request, res: Response) => {
  try {
    console.log('Attempting to read session.json'); // Debug log
    const sessions = readJsonFile('session.json');
    console.log('Successfully fetched sessions:', {
      count: sessions.length,
      path: join(__dirname, '../../../data', 'session.json')
    });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch sessions',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

// Add new endpoint to update session review
app.put('/api/sessions/:sessionId/review', ((req: Request, res: Response) => {
  try {
    const sessions = readJsonFile('session.json');
    const sessionIndex = sessions.findIndex((s: any) => s.id === req.params.sessionId);
    
    if (sessionIndex === -1) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update the session's review status
    sessions[sessionIndex].feedback = {
      ...sessions[sessionIndex].feedback,
      reviewed: true,
      reviewDate: new Date().toISOString(),
      reviewedBy: 'current-doctor-id', // Replace with actual doctor ID from auth
    };

    // Write updated sessions back to file
    writeJsonFile('session.json', sessions);

    console.log('Session review completed:', sessions[sessionIndex]);
    res.json(sessions[sessionIndex]);
  } catch (error) {
    console.error('Error updating session review:', error);
    res.status(500).json({ 
      error: 'Failed to update session review',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

// Add new endpoint to add comments to a session
app.post('/api/sessions/:sessionId/comments', ((req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const comment = req.body;
    
    const sessions = readJsonFile('session.json');
    const sessionIndex = sessions.findIndex((s: any) => s.id === sessionId);
    
    if (sessionIndex === -1) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update session feedback
    sessions[sessionIndex].feedback = {
      ...sessions[sessionIndex].feedback,
      comments: comment.text,
      reviewedBy: comment.reviewedBy,
      reviewDate: new Date().toISOString(),
    };

    // Write updated sessions back to file
    // Note: In production, use a proper database instead
    const fs = require('fs');
    fs.writeFileSync(
      join(__dirname, '../../../data/session.json'),
      JSON.stringify(sessions, null, 2)
    );

    res.json(sessions[sessionIndex]);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ 
      error: 'Failed to add comment',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});