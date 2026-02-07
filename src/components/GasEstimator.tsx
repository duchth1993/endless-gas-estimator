import React, { useState, useMemo } from 'react';
import {
  Fuel,
  ArrowRightLeft,
  Info,
  Shield,
  Zap,
  TrendingDown,
  ChevronDown,
  Sparkles,
  Book,
} from 'lucide-react';
import {
  gasEstimates,
  GasEstimate,
  calculateGasCost,
  calculateEthEquivalent,
  EDS_PRICE_USD,
  ETH_PRICE_USD,
} from '../data/gasEstimates';
import Documentation from './Documentation';

const categoryIcons: Record<string, React.ReactNode> = {
  transfer: <ArrowRightLeft className="w-4 h-4" />,
  contract: <Zap className="w-4 h-4" />,
  nft: <Sparkles className="w-4 h-4" />,
  defi: <TrendingDown className="w-4 h-4" />,
  governance: <Shield className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  transfer: 'from-blue-500 to-cyan-500',
  contract: 'from-purple-500 to-pink-500',
  nft: 'from-amber-500 to-orange-500',
  defi: 'from-emerald-500 to-teal-500',
  governance: 'from-indigo-500 to-violet-500',
};

export default function GasEstimator() {
  const [selectedAction, setSelectedAction] = useState<GasEstimate | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  const gasResult = useMemo(() => {
    if (!selectedAction) return null;
    return calculateGasCost(selectedAction, inputValues);
  }, [selectedAction, inputValues]);

  const ethResult = useMemo(() => {
    if (!selectedAction) return null;
    return calculateEthEquivalent(selectedAction.ethEquivalentGas);
  }, [selectedAction]);

  const savings = useMemo(() => {
    if (!gasResult || !ethResult) return null;
    const savingsUsd = ethResult.usdCost - gasResult.usdCost;
    const savingsPercent = ((savingsUsd / ethResult.usdCost) * 100).toFixed(1);
    return { usd: savingsUsd, percent: savingsPercent };
  }, [gasResult, ethResult]);

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [inputId]: value }));
  };

  const handleActionSelect = (action: GasEstimate) => {
    setSelectedAction(action);
    setInputValues({});
    setIsDropdownOpen(false);
  };

  if (showDocs) {
    return <Documentation onBack={() => setShowDocs(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Fuel className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl blur opacity-40" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Endless Gas Estimator
                </h1>
                <p className="text-xs text-white/50">Developer Tools</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowDocs(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 hover:border-white/20 transition-all text-sm font-medium"
              >
                <Book className="w-4 h-4" />
                <span className="hidden sm:inline">Documentation</span>
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/70">Testnet</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50">EDS Price</p>
                <p className="text-sm font-semibold text-emerald-400">${EDS_PRICE_USD.toFixed(4)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Privacy Notice Banner */}
      <div className="relative z-10 bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-cyan-900/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/80">
              Gas paid via EDS – privacy preserved with{' '}
              <span className="relative inline-block">
                <button
                  className="text-cyan-400 font-medium underline decoration-dotted underline-offset-2 cursor-help"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  DID + E2EE
                </button>
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/20 shadow-2xl z-50">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-gray-900 border-r border-b border-white/20 rotate-45" />
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-cyan-400" />
                      Privacy Features
                    </h4>
                    <div className="space-y-2 text-xs text-white/70">
                      <p>
                        <span className="text-purple-400 font-medium">DID (Decentralized Identity):</span>{' '}
                        Self-sovereign identity that you control, not tied to centralized services.
                      </p>
                      <p>
                        <span className="text-cyan-400 font-medium">E2EE (End-to-End Encryption):</span>{' '}
                        All transaction data is encrypted, ensuring only you and the recipient can access details.
                      </p>
                    </div>
                  </div>
                )}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Action Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Select Operation</h2>
              <p className="text-white/50 text-sm">Choose a blockchain operation to estimate gas costs</p>
            </div>

            {/* Custom Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
              >
                {selectedAction ? (
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[selectedAction.category]} flex items-center justify-center`}>
                      {categoryIcons[selectedAction.category]}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{selectedAction.name}</p>
                      <p className="text-xs text-white/50">{selectedAction.description}</p>
                    </div>
                  </div>
                ) : (
                  <span className="text-white/50">Select an action...</span>
                )}
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 max-h-[400px] overflow-y-auto">
                  {gasEstimates.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleActionSelect(action)}
                      className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all hover:bg-white/10 ${
                        selectedAction?.id === action.id ? 'bg-white/10' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[action.category]} flex items-center justify-center flex-shrink-0`}>
                        {categoryIcons[action.category]}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{action.name}</p>
                        <p className="text-xs text-white/50 line-clamp-1">{action.description}</p>
                      </div>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full bg-white/5 text-white/50 capitalize">
                        {action.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Input Fields */}
            {selectedAction && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Parameters
                </h3>
                <div className="space-y-4">
                  {selectedAction.inputs.map((input) => (
                    <div key={input.id} className="space-y-2">
                      <label className="text-sm text-white/70 flex items-center gap-2">
                        {input.label}
                        {input.required && <span className="text-red-400">*</span>}
                        {input.affectsGas && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            Affects gas
                          </span>
                        )}
                      </label>
                      {input.type === 'select' ? (
                        <select
                          value={inputValues[input.id] || ''}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                        >
                          <option value="" className="bg-gray-900">Select...</option>
                          {input.options?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-gray-900">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={input.type === 'number' ? 'number' : 'text'}
                          placeholder={input.placeholder}
                          value={inputValues[input.id] || ''}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/30"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {gasResult && ethResult && savings ? (
              <>
                {/* Endless Gas Estimate Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                          <Fuel className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Endless Network</h3>
                          <p className="text-xs text-white/50">Estimated Gas Cost</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                        Recommended
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm text-white/50 mb-1">Gas Units</p>
                          <p className="text-3xl font-bold font-mono">{gasResult.gasUnits.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/50 mb-1">EDS Cost</p>
                          <p className="text-xl font-semibold text-purple-400">{gasResult.edsGasCost.toFixed(6)} EDS</p>
                        </div>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      <div className="flex justify-between items-center">
                        <span className="text-white/50">USD Equivalent</span>
                        <span className="text-2xl font-bold text-emerald-400">
                          ${gasResult.usdCost.toFixed(6)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ethereum Comparison Card */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Ethereum Network</h3>
                        <p className="text-xs text-white/50">Equivalent Operation</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-white/50 mb-1">Gas Units</p>
                        <p className="text-2xl font-bold font-mono text-white/70">
                          {selectedAction?.ethEquivalentGas.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/50 mb-1">ETH Cost</p>
                        <p className="text-lg font-semibold text-blue-400">{ethResult.ethCost.toFixed(6)} ETH</p>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="flex justify-between items-center">
                      <span className="text-white/50">USD Equivalent</span>
                      <span className="text-xl font-bold text-white/70">
                        ${ethResult.usdCost.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Savings Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingDown className="w-6 h-6 text-emerald-400" />
                    <h3 className="font-bold text-lg">Your Savings</h3>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-white/50 mb-1">Save up to</p>
                      <p className="text-4xl font-bold text-emerald-400">{savings.percent}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/50 mb-1">USD Saved</p>
                      <p className="text-2xl font-bold text-emerald-400">${savings.usd.toFixed(4)}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-12 rounded-2xl border-2 border-dashed border-white/10">
                  <Fuel className="w-16 h-16 mx-auto mb-4 text-white/20" />
                  <h3 className="text-xl font-semibold mb-2 text-white/50">Select an Operation</h3>
                  <p className="text-sm text-white/30 max-w-xs">
                    Choose a blockchain operation from the dropdown to see gas estimates and comparisons
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Start Documentation Card */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/10">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Book className="w-6 h-6 text-cyan-400" />
                Developer Documentation
              </h2>
              <p className="text-white/60 max-w-2xl">
                Learn how to add new action types, configure gas calculations, and extend the Gas Estimator module
                with comprehensive guides and examples.
              </p>
            </div>
            <button
              onClick={() => setShowDocs(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold hover:opacity-90 transition-opacity"
            >
              View Full Documentation
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Fuel className="w-4 h-4" />
              </div>
              <span className="text-sm text-white/50">Endless Gas Estimator v1.0</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <span>ETH: ${ETH_PRICE_USD.toLocaleString()}</span>
              <span>EDS: ${EDS_PRICE_USD.toFixed(4)}</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Testnet Active
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
