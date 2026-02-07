import React, { useState } from 'react';
import {
  Book,
  Code,
  FileCode,
  Layers,
  Zap,
  CheckCircle,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  Lightbulb,
  ArrowLeft,
  Hash,
  Type,
  ToggleLeft,
  List,
  Braces,
  Database,
  Shield,
  Sparkles,
  TrendingDown,
  ArrowRightLeft,
} from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

function CodeBlock({ code, language = 'typescript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/70 font-mono">{title}</span>
          </div>
          <span className="text-xs text-white/40 uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-white/80 font-mono">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/50" />
          )}
        </button>
      </div>
    </div>
  );
}

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

function Table({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="bg-white/5">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-semibold text-white/90 border-b border-white/10"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-sm text-white/70 border-b border-white/5"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Section({ id, title, icon, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'required' | 'optional' | 'type' }) {
  const variants = {
    default: 'bg-white/10 text-white/70',
    required: 'bg-red-500/20 text-red-400',
    optional: 'bg-emerald-500/20 text-emerald-400',
    type: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-mono ${variants[variant]}`}>
      {children}
    </span>
  );
}

interface DocumentationProps {
  onBack: () => void;
}

export default function Documentation({ onBack }: DocumentationProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Book className="w-4 h-4" /> },
    { id: 'schema', label: 'Configuration Schema', icon: <Braces className="w-4 h-4" /> },
    { id: 'fields', label: 'Field Reference', icon: <Database className="w-4 h-4" /> },
    { id: 'inputs', label: 'Input Types', icon: <Type className="w-4 h-4" /> },
    { id: 'categories', label: 'Categories', icon: <Layers className="w-4 h-4" /> },
    { id: 'gas-calculation', label: 'Gas Calculation', icon: <Zap className="w-4 h-4" /> },
    { id: 'examples', label: 'Examples', icon: <Code className="w-4 h-4" /> },
    { id: 'best-practices', label: 'Best Practices', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Estimator
              </button>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Book className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="font-bold">Developer Documentation</h1>
                  <p className="text-xs text-white/50">Gas Estimator Module</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-white/70">v1.0.0</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-3">
                Documentation
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border-l-2 border-purple-500'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-16">
            {/* Overview Section */}
            <Section id="overview" title="Overview" icon={<Book className="w-5 h-5 text-cyan-400" />}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/10">
                <p className="text-white/80 leading-relaxed">
                  The Gas Estimator module provides a flexible system for estimating blockchain transaction costs
                  on the Endless network. This documentation covers how to add new action types by modifying the
                  <code className="mx-1 px-2 py-0.5 rounded bg-white/10 text-cyan-400 font-mono text-sm">gasEstimates</code>
                  array in <code className="mx-1 px-2 py-0.5 rounded bg-white/10 text-purple-400 font-mono text-sm">src/data/gasEstimates.ts</code>.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Dynamic Inputs</h3>
                  <p className="text-sm text-white/60">Configure custom input fields that affect gas calculations</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Category System</h3>
                  <p className="text-sm text-white/60">Organize actions into logical categories with visual styling</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-3">
                    <TrendingDown className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-1">ETH Comparison</h3>
                  <p className="text-sm text-white/60">Automatic comparison with Ethereum gas costs</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-400 mb-1">Important</h4>
                  <p className="text-sm text-white/70">
                    After modifying the gasEstimates array, ensure you also update the
                    <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-cyan-400 font-mono text-xs">complexityMultipliers</code>
                    object if your new action uses custom complexity values.
                  </p>
                </div>
              </div>
            </Section>

            {/* Configuration Schema Section */}
            <Section id="schema" title="Configuration Schema" icon={<Braces className="w-5 h-5 text-purple-400" />}>
              <p className="text-white/70">
                Each action type in the Gas Estimator is defined as a <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-400 font-mono text-sm">GasEstimate</code> object
                with the following TypeScript interface:
              </p>

              <CodeBlock
                title="GasEstimate Interface"
                language="typescript"
                code={`interface GasEstimate {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Human-readable display name
  description: string;           // Concise explanation of the action
  category: 'transfer' | 'contract' | 'nft' | 'defi' | 'governance';
  baseGas: number;               // Minimum gas units required
  variableGas?: number;          // Additional gas per complexity unit
  inputs: InputField[];          // Array of input configurations
  ethEquivalentGas: number;      // Comparable Ethereum gas units
}`}
              />

              <CodeBlock
                title="InputField Interface"
                language="typescript"
                code={`interface InputField {
  id: string;                    // Unique input identifier
  label: string;                 // Display label
  type: 'number' | 'text' | 'address' | 'select';
  placeholder?: string;          // Placeholder text hint
  required: boolean;             // Whether input is mandatory
  options?: {                    // Required for 'select' type
    value: string;
    label: string;
  }[];
  affectsGas?: boolean;          // Whether input impacts gas calculation
  gasMultiplier?: number;        // Multiplier weight for gas calculation
}`}
              />
            </Section>

            {/* Field Reference Section */}
            <Section id="fields" title="Field Reference" icon={<Database className="w-5 h-5 text-emerald-400" />}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-red-400" />
                Required Fields
              </h3>

              <Table
                headers={['Field', 'Type', 'Description']}
                rows={[
                  [
                    <code className="text-cyan-400">id</code>,
                    <Badge variant="type">string</Badge>,
                    'Unique identifier for the action. Use kebab-case (e.g., "send-tokens", "deploy-contract")',
                  ],
                  [
                    <code className="text-cyan-400">name</code>,
                    <Badge variant="type">string</Badge>,
                    'Human-readable display name shown in the dropdown and cards',
                  ],
                  [
                    <code className="text-cyan-400">description</code>,
                    <Badge variant="type">string</Badge>,
                    'Concise explanation of what the action does (shown as subtitle)',
                  ],
                  [
                    <code className="text-cyan-400">category</code>,
                    <Badge variant="type">enum</Badge>,
                    <>One of: <Badge>transfer</Badge> <Badge>contract</Badge> <Badge>nft</Badge> <Badge>defi</Badge> <Badge>governance</Badge></>,
                  ],
                  [
                    <code className="text-cyan-400">baseGas</code>,
                    <Badge variant="type">number</Badge>,
                    'Minimum gas units required for the action (before any multipliers)',
                  ],
                  [
                    <code className="text-cyan-400">inputs</code>,
                    <Badge variant="type">InputField[]</Badge>,
                    'Array of input field configurations (can be empty array)',
                  ],
                  [
                    <code className="text-cyan-400">ethEquivalentGas</code>,
                    <Badge variant="type">number</Badge>,
                    'Comparable Ethereum gas units for cross-chain cost comparison',
                  ],
                ]}
              />

              <h3 className="text-lg font-semibold mb-4 mt-8 flex items-center gap-2">
                <ToggleLeft className="w-4 h-4 text-emerald-400" />
                Optional Fields
              </h3>

              <Table
                headers={['Field', 'Type', 'Default', 'Description']}
                rows={[
                  [
                    <code className="text-cyan-400">variableGas</code>,
                    <Badge variant="type">number</Badge>,
                    <Badge variant="optional">0</Badge>,
                    'Additional gas per complexity unit. Multiplied by complexity multipliers when inputs affect gas.',
                  ],
                ]}
              />
            </Section>

            {/* Input Types Section */}
            <Section id="inputs" title="Input Types" icon={<Type className="w-5 h-5 text-amber-400" />}>
              <p className="text-white/70 mb-6">
                The Gas Estimator supports four input types, each with specific use cases and behaviors:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-4 h-4 text-blue-400" />
                    <h4 className="font-semibold">number</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-3">Numeric input for amounts, quantities, or sizes.</p>
                  <CodeBlock
                    code={`{
  id: 'amount',
  label: 'Amount (EDS)',
  type: 'number',
  placeholder: '0.00',
  required: true
}`}
                  />
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Type className="w-4 h-4 text-purple-400" />
                    <h4 className="font-semibold">text</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-3">Free-form text input for names, identifiers, etc.</p>
                  <CodeBlock
                    code={`{
  id: 'functionName',
  label: 'Function Name',
  type: 'text',
  placeholder: 'transfer',
  required: true
}`}
                  />
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Braces className="w-4 h-4 text-cyan-400" />
                    <h4 className="font-semibold">address</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-3">Wallet or contract address input with validation styling.</p>
                  <CodeBlock
                    code={`{
  id: 'recipient',
  label: 'Recipient Address',
  type: 'address',
  placeholder: '0x...',
  required: true
}`}
                  />
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <List className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-semibold">select</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-3">Dropdown selection with predefined options.</p>
                  <CodeBlock
                    code={`{
  id: 'complexity',
  label: 'Complexity',
  type: 'select',
  required: true,
  affectsGas: true,
  options: [
    { value: 'simple', label: 'Simple' },
    { value: 'complex', label: 'Complex' }
  ]
}`}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-8">Input Field Properties</h3>

              <Table
                headers={['Property', 'Type', 'Required', 'Description']}
                rows={[
                  [
                    <code className="text-cyan-400">id</code>,
                    <Badge variant="type">string</Badge>,
                    <Badge variant="required">Yes</Badge>,
                    'Unique identifier within the action\'s inputs array',
                  ],
                  [
                    <code className="text-cyan-400">label</code>,
                    <Badge variant="type">string</Badge>,
                    <Badge variant="required">Yes</Badge>,
                    'Display label shown above the input field',
                  ],
                  [
                    <code className="text-cyan-400">type</code>,
                    <Badge variant="type">enum</Badge>,
                    <Badge variant="required">Yes</Badge>,
                    'Input type: number, text, address, or select',
                  ],
                  [
                    <code className="text-cyan-400">placeholder</code>,
                    <Badge variant="type">string</Badge>,
                    <Badge variant="optional">No</Badge>,
                    'Placeholder text shown when input is empty',
                  ],
                  [
                    <code className="text-cyan-400">required</code>,
                    <Badge variant="type">boolean</Badge>,
                    <Badge variant="required">Yes</Badge>,
                    'Whether the input must be filled (shows asterisk)',
                  ],
                  [
                    <code className="text-cyan-400">options</code>,
                    <Badge variant="type">array</Badge>,
                    <Badge variant="required">If select</Badge>,
                    'Array of {value, label} objects for select dropdowns',
                  ],
                  [
                    <code className="text-cyan-400">affectsGas</code>,
                    <Badge variant="type">boolean</Badge>,
                    <Badge variant="optional">No</Badge>,
                    'If true, shows "Affects gas" badge and includes in calculation',
                  ],
                  [
                    <code className="text-cyan-400">gasMultiplier</code>,
                    <Badge variant="type">number</Badge>,
                    <Badge variant="optional">No</Badge>,
                    'Weight factor for gas calculation (default: 1)',
                  ],
                ]}
              />
            </Section>

            {/* Categories Section */}
            <Section id="categories" title="Categories" icon={<Layers className="w-5 h-5 text-indigo-400" />}>
              <p className="text-white/70 mb-6">
                Each action must belong to one of five predefined categories. Categories determine the icon and color scheme displayed in the UI:
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <ArrowRightLeft className="w-4 h-4" />
                    </div>
                    <code className="text-blue-400 font-mono">transfer</code>
                  </div>
                  <p className="text-sm text-white/60">Token transfers, sends, and basic value movements</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <code className="text-purple-400 font-mono">contract</code>
                  </div>
                  <p className="text-sm text-white/60">Smart contract deployments, calls, and interactions</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <code className="text-amber-400 font-mono">nft</code>
                  </div>
                  <p className="text-sm text-white/60">NFT minting, transfers, and marketplace operations</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <code className="text-emerald-400 font-mono">defi</code>
                  </div>
                  <p className="text-sm text-white/60">DeFi operations: staking, swaps, liquidity, lending</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <code className="text-indigo-400 font-mono">governance</code>
                  </div>
                  <p className="text-sm text-white/60">DAO proposals, voting, and governance actions</p>
                </div>
              </div>
            </Section>

            {/* Gas Calculation Section */}
            <Section id="gas-calculation" title="Gas Calculation" icon={<Zap className="w-5 h-5 text-yellow-400" />}>
              <p className="text-white/70 mb-6">
                Understanding how gas is calculated helps you configure accurate estimates for new action types:
              </p>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 mb-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Calculation Formula
                </h4>
                <div className="p-4 rounded-lg bg-black/40 font-mono text-sm">
                  <span className="text-purple-400">totalGas</span> = <span className="text-cyan-400">baseGas</span> + 
                  (<span className="text-amber-400">variableGas</span> × <span className="text-emerald-400">complexityMultiplier</span> × 100)
                </div>
              </div>

              <CodeBlock
                title="calculateGasCost Function"
                language="typescript"
                code={`export function calculateGasCost(
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
}`}
              />

              <h3 className="text-lg font-semibold mb-4 mt-8">Complexity Multipliers</h3>
              <p className="text-white/70 mb-4">
                When an input has <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-400 font-mono text-xs">affectsGas: true</code>,
                its selected value is looked up in the <code className="px-1.5 py-0.5 rounded bg-white/10 text-purple-400 font-mono text-xs">complexityMultipliers</code> object:
              </p>

              <CodeBlock
                title="complexityMultipliers Object"
                language="typescript"
                code={`export const complexityMultipliers: Record<string, number> = {
  // Complexity levels
  simple: 1,
  moderate: 1.5,
  complex: 2.5,
  
  // Size levels
  small: 1,
  medium: 2,
  large: 3.5,
  
  // Document complexity
  none: 1,
  minimal: 1,
  standard: 1.5,
  full: 2,
  
  // Proposal types
  parameter: 1,
  upgrade: 1.8,
  treasury: 1.5,
};`}
              />

              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mt-6">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-400 mb-1">Adding Custom Multipliers</h4>
                  <p className="text-sm text-white/70">
                    If your new action uses select options with values not in the multipliers object,
                    add them to <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-400 font-mono text-xs">complexityMultipliers</code>
                    with appropriate numeric values.
                  </p>
                </div>
              </div>
            </Section>

            {/* Examples Section */}
            <Section id="examples" title="Complete Examples" icon={<Code className="w-5 h-5 text-pink-400" />}>
              <p className="text-white/70 mb-6">
                Here are complete, production-ready examples of action type configurations:
              </p>

              <h3 className="text-lg font-semibold mb-4">Example 1: Simple Transfer Action</h3>
              <CodeBlock
                title="Basic Token Transfer"
                language="typescript"
                code={`{
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
}`}
              />

              <h3 className="text-lg font-semibold mb-4 mt-8">Example 2: Action with Variable Gas</h3>
              <CodeBlock
                title="Contract Deployment with Complexity"
                language="typescript"
                code={`{
  id: 'deploy-contract',
  name: 'Deploy Smart Contract',
  description: 'Deploy a new smart contract to the Endless network',
  category: 'contract',
  baseGas: 500000,
  variableGas: 1000,  // Additional gas per complexity unit
  inputs: [
    {
      id: 'contractSize',
      label: 'Contract Size',
      type: 'select',
      required: true,
      affectsGas: true,  // This input affects gas calculation
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
      gasMultiplier: 0.5,  // Lower weight for this factor
      options: [
        { value: 'none', label: 'No constructor' },
        { value: 'simple', label: 'Simple initialization' },
        { value: 'complex', label: 'Complex setup' },
      ],
    },
  ],
  ethEquivalentGas: 800000,
}`}
              />

              <h3 className="text-lg font-semibold mb-4 mt-8">Example 3: DeFi Action</h3>
              <CodeBlock
                title="Token Swap on DEX"
                language="typescript"
                code={`{
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
}`}
              />

              <h3 className="text-lg font-semibold mb-4 mt-8">Example 4: Custom Action Template</h3>
              <CodeBlock
                title="Template for New Actions"
                language="typescript"
                code={`// Copy this template and customize for your new action
{
  id: 'your-action-id',           // Unique kebab-case identifier
  name: 'Your Action Name',        // Display name
  description: 'What this action does',
  category: 'contract',            // Choose: transfer, contract, nft, defi, governance
  baseGas: 50000,                  // Base gas units
  variableGas: 200,                // Optional: gas per complexity unit
  inputs: [
    // Add your input fields here
    {
      id: 'inputId',
      label: 'Input Label',
      type: 'select',              // number, text, address, or select
      placeholder: 'Hint text',
      required: true,
      affectsGas: true,            // Set true if this affects gas
      options: [                   // Required for select type
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
    },
  ],
  ethEquivalentGas: 75000,         // Comparable ETH gas
}`}
              />
            </Section>

            {/* Best Practices Section */}
            <Section id="best-practices" title="Best Practices" icon={<Lightbulb className="w-5 h-5 text-amber-400" />}>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Use Descriptive IDs</h4>
                    <p className="text-sm text-white/60">
                      Choose clear, kebab-case IDs that describe the action: <code className="text-cyan-400">deploy-erc20-token</code>,
                      <code className="text-cyan-400 ml-1">create-liquidity-pool</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Research Accurate Gas Values</h4>
                    <p className="text-sm text-white/60">
                      Base your <code className="text-cyan-400">baseGas</code> and <code className="text-cyan-400">ethEquivalentGas</code> values
                      on actual blockchain data or documentation for accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Provide Helpful Placeholders</h4>
                    <p className="text-sm text-white/60">
                      Use placeholder text that shows the expected format: <code className="text-cyan-400">"0x..."</code> for addresses,
                      <code className="text-cyan-400 ml-1">"100.00"</code> for amounts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Mark Gas-Affecting Inputs</h4>
                    <p className="text-sm text-white/60">
                      Set <code className="text-cyan-400">affectsGas: true</code> only for inputs that genuinely impact transaction costs.
                      This shows users which choices matter for fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Choose Appropriate Categories</h4>
                    <p className="text-sm text-white/60">
                      Select the category that best matches the action's primary purpose. This affects visual styling and helps users
                      find related operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Test Your Configuration</h4>
                    <p className="text-sm text-white/60">
                      After adding a new action, test all input combinations to ensure gas calculations produce reasonable results
                      and the UI renders correctly.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Troubleshooting Section */}
            <Section id="troubleshooting" title="Troubleshooting" icon={<AlertTriangle className="w-5 h-5 text-red-400" />}>
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Action not appearing in dropdown
                  </h4>
                  <ul className="text-sm text-white/70 space-y-2 ml-6 list-disc">
                    <li>Verify the action object is properly added to the <code className="text-cyan-400">gasEstimates</code> array</li>
                    <li>Check for syntax errors (missing commas, brackets)</li>
                    <li>Ensure all required fields are present</li>
                    <li>Confirm the category is one of the valid enum values</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Gas calculation returns unexpected values
                  </h4>
                  <ul className="text-sm text-white/70 space-y-2 ml-6 list-disc">
                    <li>Check that <code className="text-cyan-400">affectsGas</code> is set correctly on inputs</li>
                    <li>Verify select option values exist in <code className="text-cyan-400">complexityMultipliers</code></li>
                    <li>Ensure <code className="text-cyan-400">variableGas</code> is set if using complexity multipliers</li>
                    <li>Review the calculation formula in the Gas Calculation section</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Select dropdown shows empty or undefined options
                  </h4>
                  <ul className="text-sm text-white/70 space-y-2 ml-6 list-disc">
                    <li>Ensure <code className="text-cyan-400">options</code> array is defined for select-type inputs</li>
                    <li>Verify each option has both <code className="text-cyan-400">value</code> and <code className="text-cyan-400">label</code> properties</li>
                    <li>Check for typos in the options array structure</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    TypeScript compilation errors
                  </h4>
                  <ul className="text-sm text-white/70 space-y-2 ml-6 list-disc">
                    <li>Ensure category value matches the union type exactly</li>
                    <li>Verify input type is one of: 'number', 'text', 'address', 'select'</li>
                    <li>Check that all required interface properties are present</li>
                    <li>Run <code className="text-cyan-400">npm run build</code> to see detailed error messages</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/10">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  Need More Help?
                </h4>
                <p className="text-sm text-white/70">
                  If you encounter issues not covered here, check the browser console for error messages,
                  review the existing action configurations in <code className="text-purple-400">gasEstimates.ts</code> as working examples,
                  or reach out to the development team.
                </p>
              </div>
            </Section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Book className="w-4 h-4" />
              </div>
              <span className="text-sm text-white/50">Gas Estimator Documentation v1.0</span>
            </div>
            <p className="text-sm text-white/40">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
