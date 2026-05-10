import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Zap,
  BarChart2,
  CreditCard,
  Shuffle,
  Shield,
  LayoutDashboard,
  TrendingUp,
  Lock,
  RefreshCw,
  DollarSign,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Menu,
  X,
  BookOpen,
  FileText,
  MessageCircle,
  ImageIcon,
  Code2,
  ShoppingBag,
  Brush,
  Building2,
  GraduationCap,
} from "lucide-react";

const tokenData = [
  { day: "周一", tokens: 42000 },
  { day: "周二", tokens: 68000 },
  { day: "周三", tokens: 55000 },
  { day: "周四", tokens: 91000 },
  { day: "周五", tokens: 78000 },
  { day: "周六", tokens: 34000 },
  { day: "周日", tokens: 61000 },
];

const modelUsage = [
  { model: "GPT-4o", pct: 42, color: "#1e6eff" },
  { model: "Claude 3.5", pct: 31, color: "#00c2ff" },
  { model: "Gemini Pro", pct: 18, color: "#7c3aed" },
  { model: "DeepSeek", pct: 9, color: "#10b981" },
];

const painPoints = [
  {
    icon: <RefreshCw size={22} />,
    title: "AI 提供商太多",
    desc: "OpenAI、Anthropic、Google 等各家服务需要单独管理密钥和文档，极为繁琐。",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Token 用量难以追踪",
    desc: "没有统一视图，根本无从得知哪个功能或哪位用户正在大量消耗 Token。",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "API 费用增长过快",
    desc: "一次小小的流量峰值，就可能在月底悄悄变成一张高额账单。",
  },
  {
    icon: <DollarSign size={22} />,
    title: "缺少余额管理系统",
    desc: "为每位用户或团队实现预付费额度控制，自己从头开发几乎不可能。",
  },
  {
    icon: <Shuffle size={22} />,
    title: "模型切换困难",
    desc: "从 GPT-4 换成 Claude，需要改动整个代码库，成本极高。",
  },
  {
    icon: <Lock size={22} />,
    title: "缺乏滥用防护",
    desc: "没有速率限制，一个恶意用户就能在一夜之间耗尽你的全部 API 预算。",
  },
];

const features = [
  {
    icon: <Zap size={22} />,
    title: "统一 API 接入",
    desc: "一个端点，一个密钥，无需修改集成代码即可路由到任何支持的模型。",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "用量追踪",
    desc: "按用户、模型和端点实时统计 Token 消耗与费用。",
  },
  {
    icon: <CreditCard size={22} />,
    title: "余额与计费",
    desc: "为团队或终端用户提供预付费钱包，支持自动充值阈值设定。",
  },
  {
    icon: <Shuffle size={22} />,
    title: "模型路由",
    desc: "基于规则和成本的智能路由，自动降级至更经济的模型。",
  },
  {
    icon: <Shield size={22} />,
    title: "速率限制与安全",
    desc: "按密钥和用户设置速率上限，支持 IP 白名单和异常检测。",
  },
  {
    icon: <LayoutDashboard size={22} />,
    title: "管理员后台",
    desc: "在同一个界面全面掌控每一条请求、用户余额和成本中心。",
  },
];

const users = [
  { icon: <Code2 size={20} />, title: "AI 工具开发者", desc: "快速接入模型、计费与用量追踪。" },
  { icon: <ShoppingBag size={20} />, title: "电商卖家", desc: "统一管理客服、文案和搜索成本。" },
  { icon: <Brush size={20} />, title: "设计工作室", desc: "按项目控制生成任务与客户预算。" },
  { icon: <Building2 size={20} />, title: "小型 SaaS 团队", desc: "把 AI 能力接进产品后台。" },
  { icon: <GraduationCap size={20} />, title: "学生创业团队", desc: "用有限预算验证真实 AI 功能。" },
];

const pricingPlans = [
  {
    name: "入门体验版",
    price: "¥99",
    period: "",
    highlight: false,
    badge: null,
    features: [
      "包含 ¥30 API 测试额度",
      "Chat 文本对话测试",
      "Image2 图片生成测试",
      "图片生成次数限制",
      "7 天测试支持",
      "额度用完后可继续充值",
      "非无限使用套餐",
    ],
    cta: "立即开始",
  },
  {
    name: "专业版",
    price: "¥299",
    period: "/月",
    highlight: true,
    badge: "最受欢迎",
    features: [
      "无限接入 AI 模型",
      "API 用量成本另计或按预充值额度扣费",
      "高级分析与告警",
      "5 个团队席位",
      "模型路由规则",
      "速率限制与滥用防护",
      "优先支持",
    ],
    cta: "开始免费试用",
  },
  {
    name: "定制方案",
    price: "¥999 起",
    period: "",
    highlight: false,
    badge: "企业级",
    features: [
      "私有化部署",
      "多模型接入",
      "成本与利润分析",
      "用户余额与额度控制",
      "按实际 API 成本计费",
      "企业级用量上限",
    ],
    cta: "预约咨询",
  },
];

const flowSteps = [
  { label: "用户请求", highlight: false, bg: "#1e40af" },
  { label: "AIGateHub 网关", highlight: true, bg: "" },
  { label: "AI 模型", highlight: false, bg: "#5b21b6" },
  { label: "用量追踪", highlight: false, bg: "#065f46" },
  { label: "计费后台", highlight: false, bg: "#92400e" },
];

const aiModels = ["OpenAI", "Claude", "Gemini", "DeepSeek"];

const contactInfo = [
  { label: "微信", value: "uitsDreamboat" },
  { label: "邮箱", value: "qiankuanggg@gmail.com", href: "mailto:qiankuanggg@gmail.com" },
  { label: "Telegram", value: "60 193623271" },
];

type ChatRecord = {
  question: string;
  answer: string;
};

type ImageRecord = {
  prompt: string;
  promptSummary: string;
  ratio: string;
  quality: string;
  time: string;
  status: string;
};

type UsageRecord = {
  id: string;
  createdAt: string;
  time: string;
  type: "Chat" | "Image2";
  model: string;
  inputSummary: string;
  cost: number;
  status: string;
  responseTime: string;
};

const usageStorageKey = "aigatehub_usage_records";
const usageBudget = 30;

function createUsageRecord(type: "Chat" | "Image2", input: string): UsageRecord {
  const now = new Date();
  return {
    id: `${type}-${now.getTime()}-${Math.random().toString(16).slice(2)}`,
    createdAt: now.toISOString(),
    time: now.toLocaleString("zh-CN", { hour12: false }),
    type,
    model: type === "Chat" ? "Mock Chat API" : "Mock Image2 API",
    inputSummary: input.length > 28 ? `${input.slice(0, 28)}...` : input,
    cost: type === "Chat" ? 0.03 : 1.5,
    status: "成功",
    responseTime: type === "Chat" ? "320ms" : "860ms",
  };
}

function isToday(isoDate: string) {
  const target = new Date(isoDate);
  const today = new Date();
  return target.toDateString() === today.toDateString();
}

function getUsageStats(records: UsageRecord[]) {
  const todayRecords = records.filter((record) => isToday(record.createdAt));
  const usedAmount = records.reduce((sum, record) => sum + record.cost, 0);
  const chatCount = records.filter((record) => record.type === "Chat").length;
  const image2Count = records.filter((record) => record.type === "Image2").length;

  return {
    totalToday: todayRecords.length,
    chatCount,
    image2Count,
    usedAmount,
    remainingAmount: Math.max(usageBudget - usedAmount, 0),
  };
}

function formatMoney(value: number) {
  return `¥${value.toFixed(2)}`;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ContactInfo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-col gap-1.5 text-xs text-muted-foreground" : "flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground"}>
      {contactInfo.map((item) => (
        <div
          key={item.label}
          className={compact ? "flex items-center justify-between gap-3" : "inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(30,110,255,0.16)]"}
          style={compact ? {} : { background: "rgba(30,110,255,0.06)" }}
        >
          <span className="text-foreground/70">{item.label}</span>
          {item.href ? (
            <a href={item.href} className="text-accent hover:text-foreground transition-colors">
              {item.value}
            </a>
          ) : (
            <span className="text-accent">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-[rgba(30,110,255,0.3)] shadow-[0_0_60px_rgba(30,110,255,0.18)]"
      style={{ background: "linear-gradient(145deg, #0c1526 0%, #091020 100%)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(30,110,255,0.15)]">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs font-mono text-muted-foreground">AIGateHub — 控制台</span>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "今日 API 调用", value: "14,832", delta: "+12%", color: "#1e6eff" },
            { label: "账户余额", value: "¥847.20", delta: "-¥52", color: "#00c2ff" },
            { label: "累计 Token", value: "240 万", delta: "+8%", color: "#7c3aed" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 border border-[rgba(30,110,255,0.12)]"
              style={{ background: "rgba(15,30,54,0.8)" }}
            >
              <p className="text-[10px] text-muted-foreground mb-1">{s.label}</p>
              <p className="text-base font-bold" style={{ color: s.color, fontFamily: "'Sora', sans-serif" }}>{s.value}</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">{s.delta}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-3 border border-[rgba(30,110,255,0.12)]"
          style={{ background: "rgba(15,30,54,0.8)" }}
        >
          <p className="text-[10px] text-muted-foreground mb-2">Token 用量 — 近 7 天</p>
          <ResponsiveContainer width="100%" height={90}>
            <AreaChart data={tokenData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e6eff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1e6eff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,110,255,0.08)" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#6b7f9e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#6b7f9e" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#0c1526", border: "1px solid rgba(30,110,255,0.3)", borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: "#e8edf5" }}
                itemStyle={{ color: "#1e6eff" }}
              />
              <Area type="monotone" dataKey="tokens" stroke="#1e6eff" strokeWidth={2} fill="url(#tokenGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          className="rounded-xl p-3 border border-[rgba(30,110,255,0.12)]"
          style={{ background: "rgba(15,30,54,0.8)" }}
        >
          <p className="text-[10px] text-muted-foreground mb-2">模型路由分布</p>
          <div className="space-y-1.5">
            {modelUsage.map((m) => (
              <div key={m.model} className="flex items-center gap-2">
                <span className="text-[10px] w-16 text-foreground/70">{m.model}</span>
                <div className="flex-1 h-2 rounded-full bg-[rgba(30,110,255,0.1)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${m.pct}%`, background: m.color }}
                  />
                </div>
                <span className="text-[10px] w-6 text-right" style={{ color: m.color }}>{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-xl p-3 border border-[rgba(30,110,255,0.12)]"
          style={{ background: "rgba(15,30,54,0.8)" }}
        >
          <p className="text-[10px] text-muted-foreground mb-2">最近请求</p>
          <div className="space-y-1">
            {[
              { path: "/v1/chat", model: "GPT-4o", tokens: "1.2k", status: "200" },
              { path: "/v1/complete", model: "Claude", tokens: "890", status: "200" },
              { path: "/v1/chat", model: "Gemini", tokens: "540", status: "429" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between text-[10px]">
                <span className="font-mono text-accent/80">{r.path}</span>
                <span className="text-muted-foreground">{r.model}</span>
                <span className="text-muted-foreground">{r.tokens} tok</span>
                <span className={r.status === "200" ? "text-emerald-400" : "text-red-400"}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatTestPage({ onBack, onUsageRecord }: { onBack: () => void; onUsageRecord: (record: UsageRecord) => void }) {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [records, setRecords] = useState<ChatRecord[]>([]);

  const handleSend = () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const mockReply = "这是测试版 AI 回复，后续将接入真实模型 API。";
    setReply(mockReply);
    setChatCount((count) => count + 1);
    setRecords((current) => [{ question: trimmedQuestion, answer: mockReply }, ...current]);
    onUsageRecord(createUsageRecord("Chat", trimmedQuestion));
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}>
              <MessageCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Chat Test</p>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>Chat 文本对话测试</h1>
            </div>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 transition-all duration-200 active:scale-95"
          >
            <ChevronRight size={16} className="rotate-180" />
            返回控制台
          </button>
        </header>

        <section className="grid lg:grid-cols-[0.85fr_1.35fr] gap-6 items-start">
          <aside className="space-y-5">
            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm text-muted-foreground mb-4">账户概览</p>
              <div className="space-y-3">
                {[
                  ["当前套餐", "¥99 入门体验版"],
                  ["当前余额", "¥30"],
                  ["今日 Chat 调用次数", String(chatCount)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl p-4 border border-[rgba(30,110,255,0.12)]" style={{ background: "rgba(15,30,54,0.75)" }}>
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="text-lg font-bold text-accent" style={{ fontFamily: "'Sora', sans-serif" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>联系我们</p>
              <ContactInfo compact />
            </div>
          </aside>

          <main className="space-y-5">
            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.18)] shadow-[0_0_50px_rgba(30,110,255,0.12)]" style={{ background: "rgba(12,21,38,0.88)" }}>
              <label htmlFor="chat-question" className="block text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                请输入你想让 AI 回答的问题
              </label>
              <textarea
                id="chat-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                rows={5}
                className="w-full resize-none rounded-xl border border-[rgba(30,110,255,0.18)] bg-[rgba(5,10,20,0.65)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[rgba(30,110,255,0.6)] transition-colors"
                placeholder="例如：帮我写一段 AIGateHub 的产品介绍"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSend}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(30,110,255,0.4)] hover:shadow-[0_0_36px_rgba(30,110,255,0.6)]"
                  style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}
                >
                  发送 <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)] min-h-40" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>AI 回复展示区域</p>
              <div className="rounded-xl border border-[rgba(30,110,255,0.12)] p-4 text-sm leading-relaxed text-muted-foreground" style={{ background: "rgba(15,30,54,0.75)" }}>
                {reply || "发送一条测试问题后，这里会显示模拟 AI 回复。"}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>最近对话记录</p>
              <div className="space-y-3">
                {records.length === 0 ? (
                  <p className="text-sm text-muted-foreground">暂无对话记录。</p>
                ) : (
                  records.map((record, index) => (
                    <div key={`${record.question}-${index}`} className="rounded-xl border border-[rgba(30,110,255,0.12)] p-4" style={{ background: "rgba(15,30,54,0.75)" }}>
                      <p className="text-xs text-accent mb-2">用户：{record.question}</p>
                      <p className="text-sm text-muted-foreground">AI：{record.answer}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}

function Image2TestPage({ onBack, onUsageRecord }: { onBack: () => void; onUsageRecord: (record: UsageRecord) => void }) {
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("1:1");
  const [quality, setQuality] = useState("标准");
  const [remainingImages, setRemainingImages] = useState(10);
  const [preview, setPreview] = useState<ImageRecord | null>(null);
  const [records, setRecords] = useState<ImageRecord[]>([]);

  const handleGenerate = () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || remainingImages === 0) return;

    const nextImage = {
      prompt: trimmedPrompt,
      promptSummary: trimmedPrompt.length > 24 ? `${trimmedPrompt.slice(0, 24)}...` : trimmedPrompt,
      ratio,
      quality,
      time: new Date().toLocaleString("zh-CN", { hour12: false }),
      status: "生成成功",
    };
    setPreview(nextImage);
    setRecords((current) => [nextImage, ...current]);
    setRemainingImages((count) => count - 1);
    onUsageRecord(createUsageRecord("Image2", trimmedPrompt));
    setPrompt("");
  };

  const previewAspectClass = ratio === "16:9" ? "aspect-video" : ratio === "9:16" ? "aspect-[9/16] max-h-[520px]" : "aspect-square";
  const noQuota = remainingImages === 0;

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}>
              <ImageIcon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Image2 Test</p>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>Image2 图片生成测试</h1>
            </div>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 transition-all duration-200 active:scale-95"
          >
            <ChevronRight size={16} className="rotate-180" />
            返回控制台
          </button>
        </header>

        <section className="grid lg:grid-cols-[0.85fr_1.35fr] gap-6 items-start">
          <aside className="space-y-5">
            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm text-muted-foreground mb-4">账户概览</p>
              <div className="space-y-3">
                {[
                  ["当前套餐", "¥99 入门体验版"],
                  ["图片剩余额度", `${remainingImages} 张`],
                  ["当前余额", "¥30"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl p-4 border border-[rgba(30,110,255,0.12)]" style={{ background: "rgba(15,30,54,0.75)" }}>
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="text-lg font-bold text-accent" style={{ fontFamily: "'Sora', sans-serif" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.18)] shadow-[0_0_50px_rgba(30,110,255,0.12)]" style={{ background: "rgba(12,21,38,0.88)" }}>
              <label htmlFor="image2-prompt" className="block text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                请输入图片生成提示词
              </label>
              <textarea
                id="image2-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-[rgba(30,110,255,0.18)] bg-[rgba(5,10,20,0.65)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[rgba(30,110,255,0.6)] transition-colors"
                placeholder="例如：深蓝色未来感 AI SaaS 控制台海报"
              />

              <div className="mt-5">
                <p className="text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>图片比例选择</p>
                <div className="grid grid-cols-3 gap-2">
                  {["1:1", "16:9", "9:16"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setRatio(option)}
                      className={`px-3 py-2.5 rounded-xl text-sm border transition-colors ${ratio === option ? "border-[rgba(30,110,255,0.65)] text-white" : "border-[rgba(30,110,255,0.16)] text-muted-foreground hover:text-foreground hover:border-[rgba(30,110,255,0.35)]"}`}
                      style={ratio === option ? { background: "rgba(30,110,255,0.18)" } : { background: "rgba(15,30,54,0.55)" }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>质量选择</p>
                <div className="grid grid-cols-2 gap-2">
                  {["标准", "高清"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setQuality(option)}
                      className={`px-3 py-2.5 rounded-xl text-sm border transition-colors ${quality === option ? "border-[rgba(30,110,255,0.65)] text-white" : "border-[rgba(30,110,255,0.16)] text-muted-foreground hover:text-foreground hover:border-[rgba(30,110,255,0.35)]"}`}
                      style={quality === option ? { background: "rgba(30,110,255,0.18)" } : { background: "rgba(15,30,54,0.55)" }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {noQuota && (
                <p className="mt-4 text-sm text-red-300">图片额度不足，请联系管理员充值。</p>
              )}

              <button
                onClick={handleGenerate}
                disabled={noQuota}
                className={`mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 ${noQuota ? "cursor-not-allowed opacity-50" : "hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(30,110,255,0.4)] hover:shadow-[0_0_36px_rgba(30,110,255,0.6)]"}`}
                style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}
              >
                生成图片 <ArrowRight size={16} />
              </button>
            </div>
          </aside>

          <main className="space-y-5">
            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>图片预览区域</p>
              <div className={`mx-auto w-full ${previewAspectClass} rounded-2xl border border-[rgba(30,110,255,0.2)] overflow-hidden flex items-center justify-center relative`} style={{ background: "linear-gradient(135deg, rgba(30,110,255,0.35), rgba(0,194,255,0.16) 42%, rgba(124,58,237,0.28))" }}>
                <div className="absolute inset-0 opacity-35" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 26%), radial-gradient(circle at 72% 70%, rgba(0,194,255,0.45), transparent 28%)" }} />
                <div className="relative text-center p-6">
                  <ImageIcon size={36} className="mx-auto mb-3 text-white/90" />
                  <p className="text-base font-semibold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {preview ? "Mock 图片占位预览" : "生成后将在这里显示 mock 图片"}
                  </p>
                  <p className="text-sm text-white/70 max-w-md">
                    {preview ? `${preview.prompt} · ${preview.ratio} · ${preview.quality}` : "第一版暂不调用真实图片 API。"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>最近生成记录</p>
              <div className="space-y-3">
                {records.length === 0 ? (
                  <p className="text-sm text-muted-foreground">暂无生成记录。</p>
                ) : (
                  records.map((record, index) => (
                    <div key={`${record.prompt}-${index}`} className="rounded-xl border border-[rgba(30,110,255,0.12)] p-4" style={{ background: "rgba(15,30,54,0.75)" }}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <p className="text-xs text-muted-foreground">{record.time}</p>
                        <span className="w-fit rounded-full px-2.5 py-1 text-xs text-emerald-300 border border-emerald-400/20" style={{ background: "rgba(16,185,129,0.08)" }}>
                          状态：{record.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mb-2">提示词摘要：{record.promptSummary}</p>
                      <p className="text-xs text-muted-foreground">图片比例：{record.ratio} · 质量：{record.quality}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}

function UsagePage({ records, onBack }: { records: UsageRecord[]; onBack: () => void }) {
  const stats = getUsageStats(records);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}>
              <BarChart2 size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Usage</p>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>用量记录</h1>
            </div>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 transition-all duration-200 active:scale-95"
          >
            <ChevronRight size={16} className="rotate-180" />
            返回控制台
          </button>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            ["今日总请求数", String(stats.totalToday)],
            ["Chat 调用次数", String(stats.chatCount)],
            ["Image2 生成次数", String(stats.image2Count)],
            ["已用额度", formatMoney(stats.usedAmount)],
            ["剩余额度", formatMoney(stats.remainingAmount)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl p-5 border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-xs text-muted-foreground mb-2">{label}</p>
              <p className="text-2xl font-bold text-accent" style={{ fontFamily: "'Sora', sans-serif" }}>{value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-[rgba(30,110,255,0.15)] overflow-hidden" style={{ background: "rgba(12,21,38,0.8)" }}>
          <div className="p-5 border-b border-[rgba(30,110,255,0.12)]">
            <p className="text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>请求明细</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="text-xs text-muted-foreground" style={{ background: "rgba(15,30,54,0.72)" }}>
                <tr>
                  {["时间", "类型", "模型", "输入摘要", "费用", "状态", "响应时间"].map((head) => (
                    <th key={head} className="px-4 py-3 text-left font-medium">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">暂无用量记录。请先在 Chat 或 Image2 页面发起一次测试。</td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id} className="border-t border-[rgba(30,110,255,0.08)]">
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{record.time}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full px-2.5 py-1 text-xs text-accent border border-[rgba(30,110,255,0.2)]" style={{ background: "rgba(30,110,255,0.08)" }}>
                          {record.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{record.model}</td>
                      <td className="px-4 py-3 text-foreground max-w-xs">{record.inputSummary}</td>
                      <td className="px-4 py-3 text-accent">{formatMoney(record.cost)}</td>
                      <td className="px-4 py-3 text-emerald-300">{record.status}</td>
                      <td className="px-4 py-3 text-muted-foreground">{record.responseTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function DashboardPage({
  onBack,
  onOpenChat,
  onOpenImage2,
  onOpenUsage,
  usageStats,
}: {
  onBack: () => void;
  onOpenChat: () => void;
  onOpenImage2: () => void;
  onOpenUsage: () => void;
  usageStats: ReturnType<typeof getUsageStats>;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}>
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Dashboard</p>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>AIGateHub 控制台</h1>
            </div>
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 transition-all duration-200 active:scale-95"
          >
            <ChevronRight size={16} className="rotate-180" />
            返回官网
          </button>
        </header>

        <section className="grid lg:grid-cols-[0.95fr_1.35fr] gap-6 items-start">
          <div className="space-y-5">
            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm text-muted-foreground mb-2">当前状态</p>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>统一网关运行中</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Chat 调用次数", String(usageStats.chatCount)],
                  ["Image2 生成次数", String(usageStats.image2Count)],
                  ["已用额度", formatMoney(usageStats.usedAmount)],
                  ["剩余额度", formatMoney(usageStats.remainingAmount)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl p-4 border border-[rgba(30,110,255,0.12)]" style={{ background: "rgba(15,30,54,0.75)" }}>
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className="text-lg font-bold text-accent" style={{ fontFamily: "'Sora', sans-serif" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm text-muted-foreground mb-3">快捷入口</p>
              <div className="space-y-2">
                <button
                  onClick={onOpenChat}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 shadow-[0_0_18px_rgba(30,110,255,0.28)]"
                  style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}
                >
                  进入 Chat 测试
                  <MessageCircle size={16} />
                </button>
                <button
                  onClick={onOpenImage2}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 transition-all duration-200 active:scale-95"
                >
                  进入 Image2 测试
                  <ImageIcon size={16} className="text-accent" />
                </button>
                <button
                  onClick={onOpenUsage}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 transition-all duration-200 active:scale-95"
                >
                  查看用量记录
                  <BarChart2 size={16} className="text-accent" />
                </button>
                {["API 密钥管理", "模型路由规则", "余额与计费", "用量告警"].map((item) => (
                  <button
                    key={item}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm border border-[rgba(30,110,255,0.12)] hover:border-[rgba(30,110,255,0.35)] hover:bg-white/5 transition-colors"
                  >
                    {item}
                    <ChevronRight size={15} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-[rgba(30,110,255,0.15)]" style={{ background: "rgba(12,21,38,0.8)" }}>
              <p className="text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>联系我们</p>
              <ContactInfo compact />
            </div>
          </div>

          <DashboardMockup />
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"landing" | "dashboard" | "chat" | "image2" | "usage">("landing");
  const [usageRecords, setUsageRecords] = useState<UsageRecord[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedRecords = window.localStorage.getItem(usageStorageKey);
      return savedRecords ? JSON.parse(savedRecords) : [];
    } catch {
      return [];
    }
  });
  const usageStats = getUsageStats(usageRecords);

  const navLinks = [
    { label: "功能", id: "features" },
    { label: "价格", id: "pricing" },
    { label: "文档", id: "docs" },
    { label: "博客", id: "blog" },
    { label: "联系", id: "contact" },
  ];

  const handleNav = (id: string) => {
    setMobileOpen(false);
    scrollTo(id);
  };

  const showDashboard = () => {
    setMobileOpen(false);
    setCurrentView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showLanding = () => {
    setCurrentView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addUsageRecord = (record: UsageRecord) => {
    setUsageRecords((current) => [record, ...current]);
  };

  useEffect(() => {
    window.localStorage.setItem(usageStorageKey, JSON.stringify(usageRecords));
  }, [usageRecords]);

  if (currentView === "dashboard") {
    return (
      <DashboardPage
        onBack={showLanding}
        onOpenChat={() => setCurrentView("chat")}
        onOpenImage2={() => setCurrentView("image2")}
        onOpenUsage={() => setCurrentView("usage")}
        usageStats={usageStats}
      />
    );
  }

  if (currentView === "chat") {
    return <ChatTestPage onBack={() => setCurrentView("dashboard")} onUsageRecord={addUsageRecord} />;
  }

  if (currentView === "image2") {
    return <Image2TestPage onBack={() => setCurrentView("dashboard")} onUsageRecord={addUsageRecord} />;
  }

  if (currentView === "usage") {
    return <UsagePage records={usageRecords} onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(30,110,255,0.12)] backdrop-blur-lg" style={{ background: "rgba(5,10,20,0.85)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}>
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>AIGateHub</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="hover:text-foreground transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/5 active:scale-95">
              登录
            </button>
            <button
              onClick={showDashboard}
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-[0_0_16px_rgba(30,110,255,0.3)]"
              style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}
            >
              立即开始
            </button>
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[rgba(30,110,255,0.12)] px-6 py-4 space-y-1" style={{ background: "rgba(5,10,20,0.97)" }}>
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="block w-full text-left text-sm text-muted-foreground hover:text-foreground py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[rgba(30,110,255,0.1)] mt-2">
              <button className="block w-full text-left text-sm text-muted-foreground hover:text-foreground py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors">
                登录
              </button>
              <button
                onClick={showDashboard}
                className="w-full text-sm font-semibold px-4 py-2.5 rounded-lg text-white mt-2 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}
              >
                立即开始
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]" style={{ background: "#1e6eff" }} />
          <div className="absolute top-40 right-1/4 w-72 h-72 rounded-full opacity-15 blur-[100px]" style={{ background: "#00c2ff" }} />
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 rounded-full opacity-10 blur-[80px]" style={{ background: "#7c3aed" }} />
        </div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-[rgba(30,110,255,0.3)]"
              style={{ background: "rgba(30,110,255,0.1)", color: "#00c2ff" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2ff] animate-pulse" />
              已支持 GPT-4o、Claude 3.5、Gemini 1.5 和 DeepSeek
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
              面向小团队的{" "}
              <span style={{ background: "linear-gradient(90deg, #1e6eff, #00c2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                统一 AI API 网关
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              统一接入多个 AI 模型，追踪 Token 用量，控制成本，并通过一个简洁的后台管理用户访问权限。
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={showDashboard}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(30,110,255,0.4)] hover:shadow-[0_0_36px_rgba(30,110,255,0.6)]"
                style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}
              >
                免费咨询 <ArrowRight size={16} />
              </button>
              <button
                onClick={showDashboard}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 active:scale-95 transition-all duration-200"
              >
                查看演示 <ChevronRight size={16} />
              </button>
            </div>
            <div className="mt-5">
              <ContactInfo />
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-8 text-xs text-muted-foreground">
              {["无需信用卡", "10 分钟完成配置", "随时可取消"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-emerald-400" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div id="demo">
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full opacity-10 blur-[100px]" style={{ background: "#7c3aed" }} />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>痛点分析</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
              构建 AI 工具不难。<br />
              <span className="text-muted-foreground">管控 API 成本才是难题。</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="group p-6 rounded-2xl border border-[rgba(30,110,255,0.12)] hover:border-[rgba(30,110,255,0.3)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(30,110,255,0.08)] cursor-default"
                style={{ background: "rgba(12,21,38,0.8)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-red-400/80 group-hover:text-red-400 transition-colors" style={{ background: "rgba(212,24,61,0.1)" }}>
                  {p.icon}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION / FLOW */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full opacity-15 blur-[120px]" style={{ background: "#1e6eff" }} />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>工作原理</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
              一个网关，统一管理所有 AI 模型。
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10 flex-wrap">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div
                  className={`px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 ${step.highlight ? "shadow-[0_0_24px_rgba(30,110,255,0.5)]" : ""}`}
                  style={{
                    background: step.highlight ? "linear-gradient(135deg, #1e6eff, #00c2ff)" : step.bg,
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  {step.label}
                </div>
                {i < flowSteps.length - 1 && (
                  <ChevronRight size={18} className="text-muted-foreground hidden md:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>已支持模型：</span>
            {aiModels.map((m) => (
              <span
                key={m}
                className="px-3 py-1 rounded-full text-xs font-medium border border-[rgba(30,110,255,0.25)] text-accent"
                style={{ background: "rgba(30,110,255,0.08)" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 relative scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>平台功能</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
              你需要的，一个不少。
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-[rgba(30,110,255,0.12)] hover:border-[rgba(30,110,255,0.35)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(30,110,255,0.1)] cursor-default"
                style={{ background: "rgba(12,21,38,0.8)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:shadow-[0_0_16px_rgba(30,110,255,0.4)] transition-all duration-200" style={{ background: "rgba(30,110,255,0.12)" }}>
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET USERS */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full opacity-10 blur-[100px]" style={{ background: "#00c2ff" }} />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>适用人群</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
              专为落地 AI 的团队而生。
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {users.map((u) => (
              <div
                key={u.title}
                className="group p-5 rounded-2xl border border-[rgba(30,110,255,0.13)] hover:border-[rgba(30,110,255,0.38)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(30,110,255,0.12)] cursor-default text-left"
                style={{ background: "linear-gradient(145deg, rgba(12,21,38,0.92), rgba(15,30,54,0.68))" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-accent border border-[rgba(30,110,255,0.18)] group-hover:shadow-[0_0_18px_rgba(0,194,255,0.18)] transition-all" style={{ background: "rgba(30,110,255,0.1)" }}>
                  {u.icon}
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{u.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 relative scroll-mt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[140px]" style={{ background: "#1e6eff" }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>价格方案</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
              透明定价，无隐藏费用。
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-7 rounded-2xl border transition-all duration-200 flex flex-col ${plan.highlight ? "border-[rgba(30,110,255,0.6)] shadow-[0_0_50px_rgba(30,110,255,0.2)]" : "border-[rgba(30,110,255,0.15)] hover:border-[rgba(30,110,255,0.3)] hover:shadow-[0_0_30px_rgba(30,110,255,0.08)]"}`}
                style={{ background: plan.highlight ? "linear-gradient(145deg, #0f1e36, #0c1a30)" : "rgba(12,21,38,0.8)" }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: plan.highlight ? "linear-gradient(135deg, #1e6eff, #00c2ff)" : "rgba(124,58,237,0.8)" }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif", color: plan.highlight ? "#00c2ff" : "#e8edf5" }}>{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("contact")}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${plan.highlight ? "text-white shadow-[0_0_20px_rgba(30,110,255,0.4)] hover:opacity-90 hover:shadow-[0_0_30px_rgba(30,110,255,0.6)]" : "border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5"}`}
                  style={plan.highlight ? { background: "linear-gradient(135deg, #1e6eff, #00c2ff)" } : {}}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl border border-[rgba(30,110,255,0.15)] text-center" style={{ background: "rgba(12,21,38,0.8)" }}>
            <p className="text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>预约咨询或获取报价</p>
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* DOCS PLACEHOLDER */}
      <section id="docs" className="py-20 px-6 relative scroll-mt-16 border-t border-[rgba(30,110,255,0.08)]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5" style={{ background: "rgba(30,110,255,0.1)" }}>
            <FileText size={24} className="text-primary" />
          </div>
          <p className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>开发文档</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>文档正在完善中</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            完整的 API 参考文档、集成指南和示例代码即将上线。欢迎提前联系我们获取早期访问权限。
          </p>
          <div className="mb-6">
            <ContactInfo />
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[rgba(30,110,255,0.3)] text-foreground hover:border-[rgba(30,110,255,0.6)] hover:bg-white/5 transition-all duration-200 active:scale-95"
          >
            申请提前访问 <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* BLOG PLACEHOLDER */}
      <section id="blog" className="py-20 px-6 relative scroll-mt-16 border-t border-[rgba(30,110,255,0.08)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5" style={{ background: "rgba(30,110,255,0.1)" }}>
              <BookOpen size={24} className="text-primary" />
            </div>
            <p className="text-xs uppercase tracking-widest text-accent mb-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>博客</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>即将推出的博客文章</h2>
            <p className="text-muted-foreground max-w-md mx-auto">我们将在这里分享 AI API 成本优化、模型选型和工程实践等内容。</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { tag: "成本优化", title: "如何将 GPT-4o 的调用成本降低 60%", date: "即将发布" },
              { tag: "工程实践", title: "小团队 AI 网关架构设计指南", date: "即将发布" },
              { tag: "模型评测", title: "2025 年主流大模型 API 横向对比", date: "即将发布" },
            ].map((post) => (
              <div
                key={post.title}
                className="p-6 rounded-2xl border border-[rgba(30,110,255,0.12)] hover:border-[rgba(30,110,255,0.3)] transition-all duration-200 cursor-pointer hover:shadow-[0_0_24px_rgba(30,110,255,0.08)]"
                style={{ background: "rgba(12,21,38,0.8)" }}
              >
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 text-accent"
                  style={{ background: "rgba(30,110,255,0.1)", border: "1px solid rgba(30,110,255,0.2)" }}
                >
                  {post.tag}
                </span>
                <h3 className="text-sm font-semibold mb-3 leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>{post.title}</h3>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 px-6 relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(30,110,255,0.25) 0%, transparent 70%)" }} />
        </div>
        <div id="contact" className="relative max-w-3xl mx-auto text-center scroll-mt-20">
          <div
            className="p-12 rounded-3xl border border-[rgba(30,110,255,0.25)] shadow-[0_0_80px_rgba(30,110,255,0.15)]"
            style={{ background: "rgba(12,21,38,0.9)" }}
          >
            <p className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>立即行动</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              准备好掌控你的<br />
              <span style={{ background: "linear-gradient(90deg, #1e6eff, #00c2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AI API 成本了吗？
              </span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              预约一次 30 分钟的免费咨询，我们将梳理你当前的 AI 支出状况，并演示 AIGateHub 能为你省下多少费用。
            </p>
            <div className="mb-8">
              <ContactInfo />
            </div>
            <button
              onClick={showDashboard}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(30,110,255,0.5)] hover:shadow-[0_0_50px_rgba(30,110,255,0.7)]"
              style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}
            >
              免费咨询 <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(30,110,255,0.12)] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e6eff, #00c2ff)" }}>
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>AIGateHub</span>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">© 2025 AIGateHub. 保留所有权利。</p>
            <ContactInfo compact />
          </div>
          <div className="flex gap-5 text-xs text-muted-foreground">
            {[["隐私政策", ""], ["服务条款", ""], ["联系我们", "contact"]].map(([label, id]) => (
              <button
                key={label}
                onClick={() => id && scrollTo(id)}
                className="hover:text-foreground transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
