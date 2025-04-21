"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "Libélulas Design",
    storeEmail: "info@libelulasdesign.com",
    storePhone: "+52 123 456 7890",
    storeAddress: "Calle Principal 123, Ciudad de México, México",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    metaTitle: "Libélulas Design - Papelería y Diseño",
    metaDescription: "Tienda de papelería y diseño con productos únicos y personalizados.",
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "MXN",
    currencySymbol: "$",
    paypalEnabled: true,
    paypalEmail: "payments@libelulasdesign.com",
    stripeEnabled: true,
    stripeKey: "sk_test_123456789",
    bankTransferEnabled: true,
    bankDetails: "Banco: BBVA\nCuenta: 1234567890\nClabe: 012345678901234567",
  });
  
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingEnabled: true,
    freeShippingMinimum: "500",
    flatRateEnabled: true,
    flatRateAmount: "80",
    localPickupEnabled: true,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "info@libelulasdesign.com",
    smtpPassword: "password123",
    fromEmail: "info@libelulasdesign.com",
    fromName: "Libélulas Design",
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePaymentSwitchChange = (name: string, checked: boolean) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleShippingSwitchChange = (name: string, checked: boolean) => {
    setShippingSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const saveSettings = (type: string) => {
    // In a real app, you would call an API to save the settings
    console.log(`Saving ${type} settings`);
    
    // Show success message
    alert(`Configuración de ${type} guardada correctamente`);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Configuración</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Pagos</TabsTrigger>
          <TabsTrigger value="shipping">Envíos</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Configura la información básica de tu tienda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nombre de la Tienda</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email de la Tienda</Label>
                  <Input
                    id="storeEmail"
                    name="storeEmail"
                    type="email"
                    value={generalSettings.storeEmail}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Teléfono</Label>
                  <Input
                    id="storePhone"
                    name="storePhone"
                    value={generalSettings.storePhone}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Dirección</Label>
                  <Input
                    id="storeAddress"
                    name="storeAddress"
                    value={generalSettings.storeAddress}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">URL del Logo</Label>
                  <Input
                    id="logoUrl"
                    name="logoUrl"
                    value={generalSettings.logoUrl}
                    onChange={handleGeneralChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl">URL del Favicon</Label>
                  <Input
                    id="faviconUrl"
                    name="faviconUrl"
                    value={generalSettings.faviconUrl}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Título Meta</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={generalSettings.metaTitle}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Descripción Meta</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={generalSettings.metaDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => saveSettings('general')}>
                  <FontAwesomeIcon icon={faSave} className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>
                Configura los métodos de pago disponibles en tu tienda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <select
                    id="currency"
                    name="currency"
                    value={paymentSettings.currency}
                    onChange={handlePaymentChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="MXN">Peso Mexicano (MXN)</option>
                    <option value="USD">Dólar Estadounidense (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currencySymbol">Símbolo de Moneda</Label>
                  <Input
                    id="currencySymbol"
                    name="currencySymbol"
                    value={paymentSettings.currencySymbol}
                    onChange={handlePaymentChange}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">PayPal</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paypalEnabled"
                      checked={paymentSettings.paypalEnabled}
                      onCheckedChange={(checked) => handlePaymentSwitchChange('paypalEnabled', checked)}
                    />
                    <Label htmlFor="paypalEnabled">Habilitar PayPal</Label>
                  </div>
                  
                  {paymentSettings.paypalEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">Email de PayPal</Label>
                      <Input
                        id="paypalEmail"
                        name="paypalEmail"
                        type="email"
                        value={paymentSettings.paypalEmail}
                        onChange={handlePaymentChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Stripe</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="stripeEnabled"
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) => handlePaymentSwitchChange('stripeEnabled', checked)}
                    />
                    <Label htmlFor="stripeEnabled">Habilitar Stripe</Label>
                  </div>
                  
                  {paymentSettings.stripeEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="stripeKey">Clave API de Stripe</Label>
                      <Input
                        id="stripeKey"
                        name="stripeKey"
                        value={paymentSettings.stripeKey}
                        onChange={handlePaymentChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Transferencia Bancaria</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="bankTransferEnabled"
                      checked={paymentSettings.bankTransferEnabled}
                      onCheckedChange={(checked) => handlePaymentSwitchChange('bankTransferEnabled', checked)}
                    />
                    <Label htmlFor="bankTransferEnabled">Habilitar Transferencia Bancaria</Label>
                  </div>
                  
                  {paymentSettings.bankTransferEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="bankDetails">Detalles Bancarios</Label>
                      <Textarea
                        id="bankDetails"
                        name="bankDetails"
                        value={paymentSettings.bankDetails}
                        onChange={handlePaymentChange}
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => saveSettings('payment')}>
                  <FontAwesomeIcon icon={faSave} className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Envíos</CardTitle>
              <CardDescription>
                Configura las opciones de envío disponibles en tu tienda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-t border-transparent pt-4">
                <h3 className="text-lg font-medium mb-4">Envío Gratuito</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="freeShippingEnabled"
                      checked={shippingSettings.freeShippingEnabled}
                      onCheckedChange={(checked) => handleShippingSwitchChange('freeShippingEnabled', checked)}
                    />
                    <Label htmlFor="freeShippingEnabled">Habilitar Envío Gratuito</Label>
                  </div>
                  
                  {shippingSettings.freeShippingEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="freeShippingMinimum">Monto Mínimo para Envío Gratuito ($)</Label>
                      <Input
                        id="freeShippingMinimum"
                        name="freeShippingMinimum"
                        type="number"
                        min="0"
                        step="1"
                        value={shippingSettings.freeShippingMinimum}
                        onChange={handleShippingChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Tarifa Fija</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="flatRateEnabled"
                      checked={shippingSettings.flatRateEnabled}
                      onCheckedChange={(checked) => handleShippingSwitchChange('flatRateEnabled', checked)}
                    />
                    <Label htmlFor="flatRateEnabled">Habilitar Tarifa Fija</Label>
                  </div>
                  
                  {shippingSettings.flatRateEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="flatRateAmount">Monto de Tarifa Fija ($)</Label>
                      <Input
                        id="flatRateAmount"
                        name="flatRateAmount"
                        type="number"
                        min="0"
                        step="1"
                        value={shippingSettings.flatRateAmount}
                        onChange={handleShippingChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Recogida Local</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="localPickupEnabled"
                      checked={shippingSettings.localPickupEnabled}
                      onCheckedChange={(checked) => handleShippingSwitchChange('localPickupEnabled', checked)}
                    />
                    <Label htmlFor="localPickupEnabled">Habilitar Recogida Local</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => saveSettings('shipping')}>
                  <FontAwesomeIcon icon={faSave} className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Email</CardTitle>
              <CardDescription>
                Configura las opciones de envío de emails.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">Servidor SMTP</Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Puerto SMTP</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Usuario SMTP</Label>
                  <Input
                    id="smtpUser"
                    name="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Contraseña SMTP</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">Email Remitente</Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromName">Nombre Remitente</Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    value={emailSettings.fromName}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => saveSettings('email')}>
                  <FontAwesomeIcon icon={faSave} className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}