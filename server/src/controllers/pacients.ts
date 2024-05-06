import { Request, Response } from "express";
import { prismaClient } from "..";
import { CreatePacientSchema } from "../schemas/pacient";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createPacient = async (req: Request, res: Response) => {
  CreatePacientSchema.parse(req.body);

  let pacient = await prismaClient.pacient.findFirst({
    where: {
      email: req.body.email,
    },
  });

  console.log(req.body);

  if (pacient) {
    throw new Error("Pacient already exists");
  }

  const newPacient = await prismaClient.pacient.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      birthDate: req.body.birthDate,
      address: req.body.address,
      cpf: req.body.cpf,
    },
  });

  console.log(newPacient);

  res.json(newPacient);
};

export const updatePacient = async (req: Request, res: Response) => {
  try {
    const pacient = req.body;
    const updatedPacient = await prismaClient.pacient.update({
      where: {
        id: +req.params.id,
      },
      data: pacient,
    });

    res.json(updatedPacient);
  } catch (error) {
    throw new NotFoundException(
      "Pacient not found",
      ErrorCode.PACIENT_NOT_FOUND
    );
  }
};

export const deletePacient = async (req: Request, res: Response) => {
  try {
    const deletedPacient = await prismaClient.pacient.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json(deletedPacient);
  } catch (error) {
    throw new NotFoundException(
      "Pacient not found",
      ErrorCode.PACIENT_NOT_FOUND
    );
  }
};

export const listPacients = async (req: Request, res: Response) => {
  try {
    const pacients = await prismaClient.pacient.findMany();

    res.json(pacients);
  } catch (error) {
    throw new NotFoundException(
      "Pacients not found",
      ErrorCode.PACIENT_NOT_FOUND
    );
  }
};

export const getPacientById = async (req: Request, res: Response) => {
  try {
    const pacient = await prismaClient.pacient.findFirst({
      where: {
        id: +req.params.id,
      },
    });

    res.json(pacient);
  } catch (error) {
    throw new NotFoundException(
      "Pacient not found",
      ErrorCode.PACIENT_NOT_FOUND
    );
  }
};
