import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { z } from "zod";

const proposalSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail corporativo inválido"),
  company: z.string().min(2, "O nome da empresa deve ter pelo menos 2 caracteres"),
  process: z.enum([
    "Vendas e Entrada de Leads (CRM/WhatsApp)",
    "Faturamento e Emissão Fiscal (NF-e/ERP)",
    "Integração Geral de Sistemas e Planilhas",
    "Assistente de IA / RAG sobre Documentos",
    "Outro processo manual sob medida"
  ], {
    errorMap: () => ({ message: "Selecione um processo crítico para continuar" })
  }),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

export const submitProposal = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      error: "Method Not Allowed"
    });
    return;
  }

  try {
    const validatedData = proposalSchema.parse(req.body);
    logger.info("Proposal received successfully", { email: validatedData.email });

    res.status(200).json({
      success: true,
      message: "Proposta recebida com sucesso!",
      data: {
        id: Math.random().toString(36).substring(2, 15),
        receivedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Validation error on proposal submission", error.errors);
      res.status(400).json({
        success: false,
        error: "Dados inválidos",
        details: error.errors.map(e => ({ path: e.path.join("."), message: e.message }))
      });
    } else {
      logger.error("Unknown error occurred", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor"
      });
    }
  }
});
