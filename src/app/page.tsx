"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneOff, Clock, Crown, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Screen = "home" | "incoming" | "active"
type Plan = "free" | "premium"

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home")
  const [plan, setPlan] = useState<Plan>("free")
  const [countdown, setCountdown] = useState<number>(0)
  const [callerName, setCallerName] = useState("Desconhecido")
  const [isRinging, setIsRinging] = useState(false)

  // Simula o countdown e dispara a chamada
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && screen === "home" && isRinging) {
      setScreen("incoming")
      // Simula vibração
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([500, 200, 500, 200, 500])
      }
    }
  }, [countdown, screen, isRinging])

  const startTimer = (seconds: number) => {
    setCountdown(seconds)
    setIsRinging(true)
  }

  const answerCall = () => {
    setScreen("active")
    setIsRinging(false)
  }

  const endCall = () => {
    setScreen("home")
    setIsRinging(false)
    setCountdown(0)
  }

  const upgradeToPremium = () => {
    setPlan("premium")
  }

  // Tela inicial
  if (screen === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-10 h-10 text-purple-400" />
              <h1 className="text-4xl font-bold text-white">Escape Call</h1>
            </div>
            <p className="text-purple-200">Sua saída discreta de qualquer situação</p>
          </div>

          {/* Status do plano */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {plan === "premium" ? (
                  <>
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">Premium Ativo</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Versão Gratuita</span>
                  </>
                )}
              </div>
              {plan === "free" && (
                <Button
                  onClick={upgradeToPremium}
                  size="sm"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold"
                >
                  Upgrade R$ 9,90
                </Button>
              )}
            </div>
          </Card>

          {/* Configuração de nome */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <label className="text-white text-sm font-medium mb-2 block">
              Nome do contato
            </label>
            <input
              type="text"
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ex: Chefe, Mãe, Entregador..."
            />
          </Card>

          {/* Seleção de tempo */}
          <div className="space-y-3">
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Receber chamada em:
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => startTimer(10)}
                disabled={countdown > 0}
                className="h-20 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg backdrop-blur-sm"
              >
                10s
              </Button>
              <Button
                onClick={() => startTimer(60)}
                disabled={countdown > 0}
                className="h-20 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg backdrop-blur-sm"
              >
                1min
              </Button>
              <Button
                onClick={() => startTimer(300)}
                disabled={countdown > 0}
                className="h-20 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg backdrop-blur-sm"
              >
                5min
              </Button>
            </div>
          </div>

          {/* Countdown ativo */}
          {countdown > 0 && (
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 p-6 animate-pulse">
              <div className="text-center space-y-2">
                <p className="text-white text-sm font-medium">Chamada programada</p>
                <p className="text-white text-4xl font-bold">
                  {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                </p>
                <Button
                  onClick={endCall}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          )}

          {/* Benefícios Premium */}
          {plan === "free" && (
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-yellow-400/30 p-4">
              <div className="flex items-start gap-3">
                <Crown className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-white font-bold">Upgrade para Premium</h3>
                  <ul className="text-purple-200 text-sm space-y-1">
                    <li>✓ Áudio realista de conversas</li>
                    <li>✓ Múltiplos cenários (chefe, família, entregador)</li>
                    <li>✓ Pausas estratégicas para você responder</li>
                    <li>✓ 100% convincente</li>
                  </ul>
                  <p className="text-yellow-400 font-bold text-lg">Apenas R$ 9,90</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Tela de chamada recebida
  if (screen === "incoming") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-between p-8 animate-pulse">
        {/* Header */}
        <div className="text-center space-y-2 mt-20">
          <p className="text-gray-400 text-sm">Chamada recebida</p>
          <h2 className="text-white text-4xl font-light">{callerName}</h2>
          <p className="text-gray-400 text-lg">Celular</p>
        </div>

        {/* Avatar */}
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Phone className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Botões de ação */}
        <div className="w-full max-w-sm space-y-8 mb-20">
          <div className="flex items-center justify-around">
            {/* Botão Recusar */}
            <button
              onClick={endCall}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all group-hover:scale-110">
                <PhoneOff className="w-8 h-8 text-white" />
              </div>
              <span className="text-white text-sm">Recusar</span>
            </button>

            {/* Botão Atender */}
            <button
              onClick={answerCall}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all group-hover:scale-110 animate-bounce">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <span className="text-white text-sm">Atender</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Tela de chamada ativa
  if (screen === "active") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-between p-8">
        {/* Header */}
        <div className="text-center space-y-4 mt-20">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
            <Phone className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-white text-4xl font-light">{callerName}</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-green-400 text-lg">Em chamada</p>
          </div>
        </div>

        {/* Status da versão */}
        <div className="flex-1 flex items-center justify-center">
          {plan === "free" ? (
            <Card className="bg-yellow-500/20 backdrop-blur-sm border-yellow-400/50 p-6 max-w-sm">
              <div className="text-center space-y-4">
                <VolumeX className="w-12 h-12 text-yellow-400 mx-auto" />
                <div className="space-y-2">
                  <p className="text-yellow-400 font-bold text-xl">VERSÃO GRATUITA</p>
                  <p className="text-white text-sm">
                    Chamada silenciosa ativa. Faça sua própria conversa.
                  </p>
                </div>
                <Button
                  onClick={upgradeToPremium}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade por R$ 9,90
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="bg-green-500/20 backdrop-blur-sm border-green-400/50 p-6 max-w-sm">
              <div className="text-center space-y-4">
                <Volume2 className="w-12 h-12 text-green-400 mx-auto animate-pulse" />
                <div className="space-y-2">
                  <p className="text-green-400 font-bold text-xl">ÁUDIO ATIVO</p>
                  <p className="text-white text-sm">
                    Reproduzindo conversa realista...
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <div className="w-1 h-8 bg-green-400 rounded animate-pulse"></div>
                    <div className="w-1 h-12 bg-green-400 rounded animate-pulse delay-75"></div>
                    <div className="w-1 h-6 bg-green-400 rounded animate-pulse delay-150"></div>
                    <div className="w-1 h-10 bg-green-400 rounded animate-pulse"></div>
                    <div className="w-1 h-8 bg-green-400 rounded animate-pulse delay-75"></div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Botão encerrar */}
        <button
          onClick={endCall}
          className="mb-20 group"
        >
          <div className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all group-hover:scale-110">
            <PhoneOff className="w-8 h-8 text-white" />
          </div>
        </button>
      </div>
    )
  }

  return null
}
