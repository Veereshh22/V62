// import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Recent Innovations in Clean Energy</Card.Title>
          <Card.Text>
            The clean energy sector has witnessed remarkable innovations in recent years, driving a global transition towards sustainable power generation. Emerging technologies like perovskite solar cells, which promise higher efficiency and lower production costs than traditional silicon-based panels, are revolutionizing photovoltaic technology. Advanced energy storage solutions, including flow batteries and solid-state batteries, are addressing intermittency challenges in renewable energy.

            Offshore wind farms are becoming increasingly sophisticated, with floating turbines enabling electricity generation in deeper waters previously considered unsuitable. Green hydrogen production is gaining momentum, utilizing renewable electricity to split water molecules, offering a promising zero-carbon fuel alternative for transportation and industrial processes.

            Artificial intelligence and machine learning are optimizing renewable energy systems, improving grid management, predicting maintenance needs, and enhancing overall energy efficiency. These technological advancements are critical in combating climate change and transitioning towards a sustainable, low-carbon future.
          </Card.Text>
          <Card.Footer>
            <small className="text-muted">
              Source: International Renewable Energy Agency (IRENA) - 
              <a 
                href="https://www.irena.org" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                www.irena.org
              </a>
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;