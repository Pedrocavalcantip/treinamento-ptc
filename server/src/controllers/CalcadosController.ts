import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CalcadosRepository } from "../repositories/CalcadosRepository";

const prisma = new PrismaClient();

export class CalcadosController {
  async create(req: Request, res: Response) {
    try {
      const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;

      // Exige campos minimos para evitar gravar registros incompletos.
      if (!nome_produto || !marca || !preco) {
        return res.status(400).json({ error: "Faltam dados obrigatórios" });
      }

      // Armazena preco como inteiro para evitar erros de ponto flutuante.
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
      return res.status(500).json({ error: "Erro interno ao criar calçado" });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const { marca, tamanho } = req.query;
      const repository = new CalcadosRepository();

      // Se vier filtro, prioriza a busca filtrada.
      if (tamanho) {
        const calcados = await repository.buscarPorTamanho(Number(tamanho));
        return res.status(200).json(calcados);
      }
      if (marca) {
        const calcados = await repository.buscarPorMarca(marca as string);
        return res.status(200).json(calcados);
      }

      // Sem filtros, retorna lista completa.
      const calcados = await prisma.calcado.findMany();
      return res.status(200).json(calcados);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao buscar calçados" });
    }
  }

  async getEstoque(req: Request, res: Response) {
    try {
      const repository = new CalcadosRepository();

      // Soma total de pares cadastrados para relatorio rapido.
      const total = await repository.contarEstoqueTotal();
      
      return res.status(200).json({ total_pares_cadastrados: total });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao calcular estoque" });
    }
  }

  async update(req : Request, res : Response) {
    try {
      const {id} = req.params;
      const {nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;

      let precoEmCentavos;
      if (preco) {
        // Atualiza preco apenas se veio no payload.
        precoEmCentavos = Math.round(preco * 100);
      }

      const calcadoAtualizado = await prisma.calcado.update({
        where : { id: Number(id) },
        data: {
          nome_produto,
          cor,
          marca,
          tamanho,
          preco: precoEmCentavos,
          quantidade_em_estoque
        }
      });

      return res.status(200).json({
        message: "Calçado atualizado !",
        calcado: calcadoAtualizado
      });
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao atualizar calçado" });
    }
  }
  
  async delete (req : Request, res : Response) {
    try {
      const {id} = req.params;

      // Exclui pelo id informado na rota.
      await prisma.calcado.delete({
        where : {id : Number(id)}
      });

      return res.status(200).json({
        message: "Calçado deletado !" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao deletar calçado" });
    }
  }
}