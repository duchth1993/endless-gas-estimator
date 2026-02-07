// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title EndlessGasEstimator
 * @dev On-chain gas estimation helper for Endless blockchain
 * @notice This contract provides gas estimation utilities for common operations
 */
contract EndlessGasEstimator {
    
    // Gas cost constants for Endless network (in gas units)
    uint256 public constant BASE_TRANSFER_GAS = 21000;
    uint256 public constant CONTRACT_CALL_BASE_GAS = 45000;
    uint256 public constant MINI_APP_MINT_GAS = 150000;
    uint256 public constant CONTRACT_DEPLOY_BASE_GAS = 500000;
    uint256 public constant STAKE_OPERATION_GAS = 85000;
    uint256 public constant GOVERNANCE_PROPOSAL_GAS = 200000;
    uint256 public constant DEX_SWAP_GAS = 120000;
    uint256 public constant DID_REGISTRATION_GAS = 95000;
    
    // Complexity multipliers (scaled by 100 for precision)
    uint256 public constant SIMPLE_MULTIPLIER = 100;
    uint256 public constant MODERATE_MULTIPLIER = 150;
    uint256 public constant COMPLEX_MULTIPLIER = 250;
    
    // Events
    event GasEstimated(address indexed user, string operation, uint256 estimatedGas);
    event OperationExecuted(address indexed user, string operation, uint256 actualGas);
    
    // Structs
    struct GasEstimate {
        string operationType;
        uint256 baseGas;
        uint256 variableGas;
        uint256 totalEstimate;
        uint256 timestamp;
    }
    
    // Mappings
    mapping(address => GasEstimate[]) public userEstimates;
    mapping(string => uint256) public operationBaseGas;
    
    constructor() {
        // Initialize operation base gas costs
        operationBaseGas["transfer"] = BASE_TRANSFER_GAS;
        operationBaseGas["contractCall"] = CONTRACT_CALL_BASE_GAS;
        operationBaseGas["mintMiniApp"] = MINI_APP_MINT_GAS;
        operationBaseGas["deployContract"] = CONTRACT_DEPLOY_BASE_GAS;
        operationBaseGas["stake"] = STAKE_OPERATION_GAS;
        operationBaseGas["governance"] = GOVERNANCE_PROPOSAL_GAS;
        operationBaseGas["swap"] = DEX_SWAP_GAS;
        operationBaseGas["registerDID"] = DID_REGISTRATION_GAS;
    }
    
    /**
     * @dev Estimate gas for a transfer operation
     * @return estimatedGas The estimated gas units
     */
    function estimateTransferGas() public pure returns (uint256 estimatedGas) {
        return BASE_TRANSFER_GAS;
    }
    
    /**
     * @dev Estimate gas for a contract call
     * @param complexity 1 = simple, 2 = moderate, 3 = complex
     * @param dataSize Size of calldata in bytes
     * @return estimatedGas The estimated gas units
     */
    function estimateContractCallGas(
        uint8 complexity,
        uint256 dataSize
    ) public pure returns (uint256 estimatedGas) {
        uint256 multiplier;
        if (complexity == 1) {
            multiplier = SIMPLE_MULTIPLIER;
        } else if (complexity == 2) {
            multiplier = MODERATE_MULTIPLIER;
        } else {
            multiplier = COMPLEX_MULTIPLIER;
        }
        
        // Base gas + (data size * 16 gas per byte) * complexity multiplier
        estimatedGas = (CONTRACT_CALL_BASE_GAS + (dataSize * 16)) * multiplier / 100;
        return estimatedGas;
    }
    
    /**
     * @dev Estimate gas for minting a mini-app
     * @param metadataSize Size of metadata in bytes
     * @return estimatedGas The estimated gas units
     */
    function estimateMiniAppMintGas(
        uint256 metadataSize
    ) public pure returns (uint256 estimatedGas) {
        // Base gas + 500 gas per KB of metadata
        estimatedGas = MINI_APP_MINT_GAS + (metadataSize * 500 / 1024);
        return estimatedGas;
    }
    
    /**
     * @dev Estimate gas for deploying a contract
     * @param contractSize Size of contract bytecode in bytes
     * @param hasComplexConstructor Whether constructor has complex logic
     * @return estimatedGas The estimated gas units
     */
    function estimateContractDeployGas(
        uint256 contractSize,
        bool hasComplexConstructor
    ) public pure returns (uint256 estimatedGas) {
        // Base gas + 200 gas per byte of bytecode
        estimatedGas = CONTRACT_DEPLOY_BASE_GAS + (contractSize * 200);
        
        if (hasComplexConstructor) {
            estimatedGas = estimatedGas * 150 / 100; // 50% increase for complex constructor
        }
        
        return estimatedGas;
    }
    
    /**
     * @dev Estimate gas for staking operation
     * @return estimatedGas The estimated gas units
     */
    function estimateStakeGas() public pure returns (uint256 estimatedGas) {
        return STAKE_OPERATION_GAS;
    }
    
    /**
     * @dev Estimate gas for creating a governance proposal
     * @param proposalType 1 = parameter, 2 = upgrade, 3 = treasury
     * @return estimatedGas The estimated gas units
     */
    function estimateGovernanceGas(
        uint8 proposalType
    ) public pure returns (uint256 estimatedGas) {
        if (proposalType == 1) {
            return GOVERNANCE_PROPOSAL_GAS;
        } else if (proposalType == 2) {
            return GOVERNANCE_PROPOSAL_GAS * 180 / 100; // Protocol upgrades cost more
        } else {
            return GOVERNANCE_PROPOSAL_GAS * 150 / 100; // Treasury allocations
        }
    }
    
    /**
     * @dev Estimate gas for DEX swap
     * @param hops Number of pools to route through
     * @return estimatedGas The estimated gas units
     */
    function estimateSwapGas(
        uint8 hops
    ) public pure returns (uint256 estimatedGas) {
        // Base swap gas + additional gas per hop
        estimatedGas = DEX_SWAP_GAS + (uint256(hops - 1) * 50000);
        return estimatedGas;
    }
    
    /**
     * @dev Estimate gas for DID registration
     * @param documentComplexity 1 = minimal, 2 = standard, 3 = full
     * @return estimatedGas The estimated gas units
     */
    function estimateDIDRegistrationGas(
        uint8 documentComplexity
    ) public pure returns (uint256 estimatedGas) {
        if (documentComplexity == 1) {
            return DID_REGISTRATION_GAS;
        } else if (documentComplexity == 2) {
            return DID_REGISTRATION_GAS * 150 / 100;
        } else {
            return DID_REGISTRATION_GAS * 200 / 100;
        }
    }
    
    /**
     * @dev Store a gas estimate for a user
     * @param operationType Type of operation
     * @param baseGas Base gas cost
     * @param variableGas Variable gas cost
     */
    function storeEstimate(
        string memory operationType,
        uint256 baseGas,
        uint256 variableGas
    ) public {
        GasEstimate memory estimate = GasEstimate({
            operationType: operationType,
            baseGas: baseGas,
            variableGas: variableGas,
            totalEstimate: baseGas + variableGas,
            timestamp: block.timestamp
        });
        
        userEstimates[msg.sender].push(estimate);
        emit GasEstimated(msg.sender, operationType, baseGas + variableGas);
    }
    
    /**
     * @dev Get all estimates for a user
     * @param user Address of the user
     * @return Array of gas estimates
     */
    function getUserEstimates(
        address user
    ) public view returns (GasEstimate[] memory) {
        return userEstimates[user];
    }
    
    /**
     * @dev Get the base gas for an operation type
     * @param operationType Type of operation
     * @return Base gas units
     */
    function getOperationBaseGas(
        string memory operationType
    ) public view returns (uint256) {
        return operationBaseGas[operationType];
    }
    
    /**
     * @dev Calculate USD cost from gas units
     * @param gasUnits Number of gas units
     * @param edsPrice EDS price in USD (scaled by 1e8)
     * @param gasPrice Gas price in EDS (scaled by 1e18)
     * @return usdCost Cost in USD (scaled by 1e8)
     */
    function calculateUSDCost(
        uint256 gasUnits,
        uint256 edsPrice,
        uint256 gasPrice
    ) public pure returns (uint256 usdCost) {
        // (gasUnits * gasPrice * edsPrice) / 1e18
        usdCost = (gasUnits * gasPrice * edsPrice) / 1e18;
        return usdCost;
    }
}
