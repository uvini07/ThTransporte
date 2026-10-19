import type { TeamData } from '../types/index.ts'

/**
 * Estrutura operacional. `totalMembers` é a equipe completa; `availableForNewContracts`
 * são os profissionais efetivamente livres para novos contratos. Não confunda os dois.
 */
export const team: TeamData = {
  totalMembers: 85,
  drivers: 60,
  logisticsStaff: null,
  supportStaff: null,
  allocatedToContracts: null,
  availableForNewContracts: null,
  coverage: null,
  simultaneousCapacity: null,
  operationModel: null,
}
