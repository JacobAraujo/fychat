# FyChat

A simple project to study WebSockets with **Spring Boot** (Java 21) on the backend and **React (Vite) + Tailwind CSS** on the frontend. It allows creating real-time chat groups, either public (listed for everyone) or private (accessible only via a generated link).

---

## Technologies

### Backend
- **Java 21**
- **Maven**
- **Spring Boot** (`spring-boot-starter-websocket`)

### Frontend
- **React + Vite**
- **Tailwind CSS**
- **Node.js / NPM**

---

## How to Run

### Clone the Repository
1. Clone the repository:
   - `git clone https://github.com/YourUser/fychat.git`
2. Navigate into the project folder:
   - `cd fychat`

### Start the Backend
1. Go to the backend directory:
   - `cd fychat-api/`
2. Run the backend:
   - `mvn spring-boot:run`
3. Access the backend at [http://localhost:8080](http://localhost:8080).

### Start the Frontend
1. Go to the frontend directory:
   - `cd fychat-frontend/`
2. Install the dependencies:
   - `npm install`
3. Start the development server:
   - `npm run dev`
4. Access the frontend at [http://localhost:5173](http://localhost:5173).

**Note**: Update the API endpoint in the backend configuration if necessary to match the frontend's address.

---

## Usage
- **Create Public Group**: Generates a shareable link and appears in the public list.
- **Create Private Group**: Generates a shareable link but does not appear in the public list.
- **Join a Group**: Use the generated link or the public list (if it’s a public group).

All messages within a group are broadcast in real-time via **WebSockets**.

---

## License
This project is licensed under the **GPL-3.0**. See the [LICENSE](./LICENSE) file for details.
