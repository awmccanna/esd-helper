"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplication = exports.createApplication = exports.getApplications = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, '..', '..', 'applicationData.json');
const readDataFromFile = () => {
    try {
        return JSON.parse(fs_1.default.readFileSync(dataFilePath, 'utf-8'));
    }
    catch (error) {
        console.error(error);
        return [];
    }
};
const writeDataToFile = (data) => {
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};
const getApplications = (request, response) => {
    const applications = readDataFromFile();
    response.json(applications);
};
exports.getApplications = getApplications;
const createApplication = (request, response) => {
    const { company, position, url, appliedDate } = request.body;
    const existingApplications = readDataFromFile();
    const newApplication = { company, position, url, appliedDate };
    existingApplications.push(newApplication);
    writeDataToFile(existingApplications);
    response.status(201).json(newApplication);
};
exports.createApplication = createApplication;
const updateApplication = (request, response) => {
    const { curCompany, newCompany, position, url, appliedDate } = request.body;
    const existingData = readDataFromFile();
    const existingApplication = existingData.find((app) => app.company === curCompany);
    if (!existingApplication) {
        return response.status(404).json({ message: 'Application company not found' });
    }
    existingApplication.company = newCompany || existingApplication.company;
    existingApplication.position = position || existingApplication.position;
    existingApplication.url = url || existingApplication.url;
    existingApplication.appliedDate = appliedDate || existingApplication.appliedDate;
    writeDataToFile(existingData);
    response.json(existingApplication);
};
exports.updateApplication = updateApplication;
