import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CalcadosRepository {
  // Filtro direto por tamanho.
  async buscarPorTamanho(tamanho: number) {
    return await prisma.calcado.findMany({
      where: { tamanho: Number(tamanho) },
    });
  }

  async buscarPorMarca(marca: string) {
    return await prisma.calcado.findMany({
      where: {
        marca: {
          contains: marca,
          mode: "insensitive", 
        },
      },
    });
  }

  async contarEstoqueTotal() {
    // Soma total de pares em estoque para relatorio simples.
    const resultado = await prisma.calcado.aggregate({
      _sum: {
        quantidade_em_estoque: true,
      },
    });
    
    return resultado._sum.quantidade_em_estoque || 0;
  }
}