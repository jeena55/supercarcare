import { Request, Response } from "express";

export const getAllUsers = async (req : Request, res : Response) => {
    
    res.send("Get all users");
};

export const getUserById = async (req : Request, res : Response) => {
    
    const id = req.params.id;

    res.send("Get a user");
};