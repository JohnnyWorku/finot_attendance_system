# FINOT Attendance System

A modern, scalable attendance tracking system built with NestJS and TypeScript. This system provides comprehensive tools for managing employee/student attendance, generating reports, and maintaining records.

## Features

- **User Management**: Create and manage user accounts with role-based access control
- **Attendance Tracking**: Record and track attendance with timestamps
- **Reporting**: Generate detailed attendance reports and analytics
- **Real-time Updates**: Live attendance status and notifications
- **Data Export**: Export attendance records in multiple formats
- **Dashboard**: Intuitive dashboard for viewing attendance statistics
- **Authentication**: Secure authentication and authorization system

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)
- A database (PostgreSQL recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/JohnnyWorku/finot_attendance_system.git
cd finot_attendance_system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory and add your configuration:
```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/finot_db
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```
The application will be available at `http://localhost:3000`

### Production Mode
```bash
npm run start:prod
```

### Watch Mode
```bash
npm run start
```

## Testing

### Run Unit Tests
```bash
npm run test
```

### Run End-to-End Tests
```bash
npm run test:e2e
```

### Generate Test Coverage Report
```bash
npm run test:cov
```

## API Documentation

Once the application is running, you can access the API documentation at:
- Swagger UI: `http://localhost:3000/api/docs`

## Project Structure

```
src/
├── modules/           # Feature modules
│   ├── auth/         # Authentication module
│   ├── users/        # User management
│   ├── attendance/   # Attendance tracking
│   └── reports/      # Reporting module
├── common/           # Shared utilities and decorators
├── config/           # Configuration files
└── main.ts           # Application entry point
```

## Database Setup

To set up the database:

```bash
# Run migrations
npm run migrate:up

# Seed initial data (optional)
npm run seed
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `DATABASE_URL` | Database connection string | - |
| `JWT_SECRET` | JWT secret key for authentication | - |
| `PORT` | Server port | `3000` |
| `LOG_LEVEL` | Application log level | `debug` |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```bash
PORT=3001 npm run start:dev
```

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Ensure your database service is running
- Check database user permissions

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Support

For support, please open an issue on the GitHub repository or contact the development team.

## License

This project is [MIT licensed](LICENSE).

## Author

- **Johnny Worku** - [GitHub](https://github.com/JohnnyWorku)

## Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- TypeScript for type safety
- All contributors and supporters

---

For more information, visit the [project repository](https://github.com/JohnnyWorku/finot_attendance_system)
