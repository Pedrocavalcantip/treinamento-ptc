import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CalcadosController {
  async create(req: Request, res: Response) {
    
    try {
      const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;

      if (!nome_produto || !marca || !preco) {
        return res.status(400).json({ error: "Faltam dados obrigatórios" });
      }
      const precoEmCentavos = Math.round(preco * 100);

        const novoCalcado = await prisma.calcado.create({
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco: precoEmCentavos,
                quantidade_em_estoque
            }
    });

      return res.status(201).json({ 
        message: "Calçado criado !", 
        calcado: novoCalcado
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno no servidor na criação do calçado" });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const calcados = await prisma.calcado.findMany();
      return res.status(200).json(calcados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao buscar calçados" });
    }
  }

  
}