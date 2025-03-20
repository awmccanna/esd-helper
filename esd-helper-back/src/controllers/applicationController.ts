import { JobApplication } from "../models/application";
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '..', '..', 'applicationData.json');

const readDataFromFile = (): JobApplication[] => {
    try {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    } catch (error) {
        console.error(error);
        return [];
    }
}

const writeDataToFile = (data: JobApplication[]) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export const getApplications = (request: any, response: any) => {
    const applications = readDataFromFile();
    response.json(applications);
}

export const createApplication = (request: any, response: any) => {
    const { company, position, url, appliedDate }: { company: string, position: string, url: string, appliedDate: string } = request.body;

    const existingApplications = readDataFromFile();

    const newApplication: JobApplication = { company, position, url, appliedDate };
    existingApplications.push(newApplication);
    writeDataToFile(existingApplications);
    response.status(201).json(newApplication);
}

export const updateApplication = (request: any, response: any) => {
    const { curCompany, newCompany, position, url, appliedDate }: { curCompany: string, newCompany?: string, position?: string, url?: string, appliedDate?: string } = request.body;

    const existingData = readDataFromFile();

    const existingApplication = existingData.find((app) =>
        app.company === curCompany
    );

    if (!existingApplication) {
        return response.status(404).json({ message: 'Application company not found' });
    }

    existingApplication.company = newCompany || existingApplication.company;
    existingApplication.position = position || existingApplication.position;
    existingApplication.url = url || existingApplication.url;
    existingApplication.appliedDate = appliedDate || existingApplication.appliedDate;
    writeDataToFile(existingData);
    response.json(existingApplication);
}