"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, CreditCard, Landmark, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GivePage() {
  const [amount, setAmount] = useState<string>("50")
  const [type, setType] = useState<string>("tithe")

  const handleDonate = () => {
    // Implement payment gateway (Paystack/Flutterwave/Stripe) integration here
    alert(`Initiating ${type} donation of $${amount}`)
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Give Online</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Partner with us to advance the Kingdom of God.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Make a Donation</CardTitle>
              <CardDescription className="text-lg">Select an amount and giving type below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label className="text-sm font-semibold mb-3 block">Giving Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['tithe', 'offering', 'project'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={cn(
                        "py-3 rounded-lg text-sm font-medium border transition-colors capitalize",
                        type === t 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-background text-foreground border-input hover:bg-muted"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 block">Amount ($)</label>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {['20', '50', '100', '200'].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={cn(
                        "py-3 rounded-lg text-sm font-medium border transition-colors",
                        amount === a 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-background text-foreground border-input hover:bg-muted"
                      )}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
                <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                  <span className="bg-muted px-4 py-3 text-muted-foreground font-medium">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 px-4 py-3 outline-none"
                    placeholder="Other amount"
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500"/> Secure Payment</h4>
                <p className="text-sm text-muted-foreground">Your transactions are 100% secure and encrypted. We do not store your payment details.</p>
              </div>

            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full text-lg h-14" onClick={handleDonate}>
                Give ${amount || '0'} Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
