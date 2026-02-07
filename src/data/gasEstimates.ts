// Gas Estimates Data Structure for Endless Blockchain
// All gas values are in EDS units (similar to Gwei for Ethereum)

export interface GasEstimate {
  id: string;
  name: string;
  description: string;
  category: 'transfer' | 'contract' | 'nft' | 'defi' | 'governance';
  baseGas: number; // Base gas units
  variableGas?: number; // Additional gas per unit (e.g., per byte, per token)
  inputs: InputField[];
  ethEquivalentGas: number; // Equivalent Ethereum gas for comparison
}

export interface InputField {
  id: string;
  label: string;
  type: 'number' | 'text' | 'address' | 'select';
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  affectsGas?: boolean;
  gasMultiplier?: number;
}

export const EDS_PRICE_USD = 0.0847; // Simulated EDS token price
export const ETH_PRICE_USD = 3245.67; // Simulated ETH price
export const ETH_GAS_PRICE_GWEI = 25; // Average Ethereum gas price

export const gasEstimates: GasEstimate[] = [
  {
    id: 'send-eds',
    name: 'Send EDS Tokens',
    description: 'Transfer EDS tokens to another wallet address',
    category: 'transfer',
    baseGas: 21000,
    inputs: [
      {
        id: 'recipient',
        label: 'Recipient Address',
        type: 'address',
        placeholder: '0x...',
        required: true,
      },
      {
        id: 'amount',
        label: 'Amount (EDS)',
        type: 'number',
        placeholder: '0.00',
        required: true,
      },
    ],
    ethEquivalentGas: 21000,
  },
  {
    id: 'call-contract',
    name: 'Call Smart Contract Function',
    description: 'Execute a function on a deployed smart contract',
    category: 'contract',
    baseGas: 45000,
    variableGas: 200,
    inputs: [
      {
        id: 'contractAddress',
        label: 'Contract Address',
        type: 'address',
        placeholder: '0x...',
        required: true,
      },
      {
        id: 'functionName',
        label: 'Function Name',
        type: 'text',
        placeholder: 'transfer, approve, etc.',
        required: true,
      },
      {
        id: 'complexity',
        label: 'Function Complexity',
        type: 'select',
        required: true,
        affectsGas: true,
        gasMultiplier: 1,
        options: [
          { value: 'simple', label: 'Simple (view/pure)' },
          { value: 'moderate', label: 'Moderate (state change)' },
          { value: 'complex', label: 'Complex (multiple operations)' },
        ],
      },
    ],
    ethEquivalentGas: 65000,
  },
  {
    id: 'mint-miniapp',
    name: 'Mint Mini-App',
    description: 'Deploy and mint a new mini-application on Endless',
    category: 'nft',
    baseGas: 150000,
    variableGas: 500,
    inputs: [
      {
        id: 'appName',
        label: 'App Name',
        type: 'text',
        placeholder: 'My Mini App',
        required: true,
      },
      {
        id: 'metadataSize',
        label: 'Metadata Size',
        type: 'select',
        required: true,
        affectsGas: true,
        gasMultiplier: 1,
        options: [
          { value: 'small', label: 'Small (< 1KB)' },
          { value: 'medium', label: 'Medium (1-5KB)' },
          { value: 'large', label: 'Large (5-10KB)' },
        ],
      },
    ],
    ethEquivalentGas: 250000,
  },
  {
    id: 'deploy-contract',
    name: 'Deploy Smart Contract',
    description: 'Deploy a new smart contract to the Endless network',
    category: 'contract',
    baseGas: 500000,
    variableGas: 1000,
    inputs: [
      {
        id: 'contractSize',
        label: 'Contract Size',
        type: 'select',
        required: true,
        affectsGas: true,
        gasMultiplier: 1,
        options: [
          { value: 'small', label: 'Small (< 5KB)' },
          { value: 'medium', label: 'Medium (5-15KB)' },
          { value: 'large', label: 'Large (15-24KB)' },
        ],
      },
      {
        id: 'hasConstructor',
        label: 'Constructor Complexity',
        type: 'select',
        required: true,
        affectsGas: true,
        gasMultiplier: 0.5,
        options: [
          { value: 'none', label: 'No constructor' },
          { value: 'simple', label: 'Simple initialization' },
          { value: 'complex', label: 'Complex setup' },
        ],
      },
    ],
    ethEquivalentGas: 800000,
  },
  {
    id: 'stake-eds',
    name: 'Stake EDS Tokens',
    description: 'Stake EDS tokens for network validation rewards',
    category: 'defi',
    baseGas: 85000,
    inputs: [
      {
        id: 'amount',
        label: 'Stake Amount (EDS)',
        type: 'number',
        placeholder: '100',
        required: true,
      },
      {
        id: 'lockPeriod',
        label: 'Lock Period',
        type: 'select',
        required: true,
        options: [
          { value: '30', label: '30 Days' },
          { value: '90', label: '90 Days' },
          { value: '180', label: '180 Days' },
          { value: '365', label: '1 Year' },
        ],
      },
    ],
    ethEquivalentGas: 120000,
  },
  {
    id: 'create-proposal',
    name: 'Create Governance Proposal',
    description: 'Submit a new governance proposal for community voting',
    category: 'governance',
    baseGas: 200000,
    inputs: [
      {
        id: 'proposalTitle',
        label: 'Proposal Title',
        type: 'text',
        placeholder: 'Proposal title...',
        required: true,
      },
      {
        id: 'proposalType',
        label: 'Proposal Type',
        type: 'select',
        required: true,
        affectsGas: true,
        gasMultiplier: 1,
        options: [
          { value: 'parameter', label: 'Parameter Change' },
          { value: 'upgrade', label: 'Protocol Upgrade' },
          { value: 'treasury', label: 'Treasury Allocation' },
        ],
      },
    ],
    ethEquivalentGas: 350000,
  },
  {
    id: 'swap-tokens',
    name: 'Swap Tokens (DEX)',
    description: 'Swap tokens on Endless decentralized exchange',
    category: 'defi',
    baseGas: 120000,
    inputs: [
      {
        id: 'fromToken',
        label: 'From Token',
        type: 'text',
        placeholder: 'EDS',
        required: true,
      },
      {
        id: 'toToken',
        label: 'To Token',
        type: 'text',
        placeholder: 'USDC',
        required: true,
      },
      {
        id: 'amount',
        label: 'Amount',
        type: 'number',
        placeholder: '0.00',
        required: true,
      },
    ],
    ethEquivalentGas: 180000,
  },
  {
    id: 'register-did',
    name: 'Register DID Identity',
    description: 'Register a new Decentralized Identity on Endless',
    category: 'contract',
    baseGas: 95000,
    inputs: [
      {
        id: 'didDocument',
        label: 'DID Document Size',
        type: 'select',
        required: true,
        affectsGas: true,
        gasMultiplier: 1,
        options: [
          { value: 'minimal', label: 'Minimal (basic identity)' },
          { value: 'standard', label: 'Standard (with services)' },
          { value: 'full', label: 'Full (with verification methods)' },
        ],
      },
    ],
    ethEquivalentGas: 150000,
  },
];

export const complexityMultipliers: Record<string, number> = {
  simple: 1,
  moderate: 1.5,
  complex: 2.5,
  small: 1,
  medium: 2,
  large: 3.5,
  none: 1,
  minimal: 1,
  standard: 1.5,
  full: 2,
  parameter: 1,
  upgrade: 1.8,
  treasury: 1.5,
};

export function calculateGasCost(
  estimate: GasEstimate,
  inputValues: Record<string, string>
): { gasUnits: number; edsGasCost: number; usdCost: number } {
  let totalGas = estimate.baseGas;

  // Apply multipliers based on input values
  estimate.inputs.forEach((input) => {
    if (input.affectsGas && inputValues[input.id]) {
      const multiplier = complexityMultipliers[inputValues[input.id]] || 1;
      totalGas += (estimate.variableGas || 0) * multiplier * 100;
    }
  });

  // EDS gas price (simulated at 0.000001 EDS per gas unit)
  const edsGasPrice = 0.000001;
  const edsGasCost = totalGas * edsGasPrice;
  const usdCost = edsGasCost * EDS_PRICE_USD;

  return { gasUnits: totalGas, edsGasCost, usdCost };
}

export function calculateEthEquivalent(ethGas: number): {
  ethCost: number;
  usdCost: number;
} {
  const ethCost = (ethGas * ETH_GAS_PRICE_GWEI) / 1e9;
  const usdCost = ethCost * ETH_PRICE_USD;
  return { ethCost, usdCost };
}
