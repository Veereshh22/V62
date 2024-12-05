// import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Summary = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Technical Project Overview</Card.Title>
          <Card.Text>
            This Clean Energy Dashboard is a modern Single Page Application (SPA) built 
            with React and Bootstrap for the frontend, and Node.js with Express for the backend. 
            The application implements JWT-based authentication, providing secure access 
            to dashboard functionalities. 

            The tech stack leverages contemporary web development technologies:
            - Frontend: React 18, React Router for navigation, Bootstrap for styling
            - Backend: Node.js, Express.js for REST API
            - Authentication: JSON Web Tokens (JWT)
            - Charting: Chart.js with react-chartjs-2
            
            Key architectural features include:
            - Decoupled frontend and backend communication via HTTP calls
            - Protected routes preventing unauthorized access
            - Responsive and accessible user interface
            - Dynamic data visualization of renewable energy trends

            The project demonstrates modern web application development principles, 
            focusing on clean code, separation of concerns, and user experience.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Summary;