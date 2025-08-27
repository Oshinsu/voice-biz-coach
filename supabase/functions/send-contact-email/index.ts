import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  studentCount: string;
  timeline: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    console.log("Received contact form submission:", formData);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Byss VNS <contact@byssvns.com>",
      to: [formData.email],
      subject: "Confirmation de votre demande - Byss VNS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Merci pour votre intérêt, ${formData.name}!</h1>
          
          <p style="margin-bottom: 15px;">Nous avons bien reçu votre demande de démonstration pour Byss VNS.</p>
          
          <h2 style="color: #374151; font-size: 18px; margin: 20px 0 10px 0;">Récapitulatif de votre demande :</h2>
          <ul style="line-height: 1.6;">
            <li><strong>Institution :</strong> ${formData.institution}</li>
            <li><strong>Rôle :</strong> ${formData.role}</li>
            <li><strong>Nombre d'étudiants :</strong> ${formData.studentCount}</li>
            <li><strong>Délai de déploiement :</strong> ${formData.timeline}</li>
            <li><strong>Téléphone :</strong> ${formData.phone}</li>
          </ul>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Votre message :</strong></p>
            <p style="margin: 5px 0 0 0; font-style: italic;">"${formData.message}"</p>
          </div>
          
          <p style="margin: 20px 0;">Notre équipe va étudier votre demande et vous recontacter dans les plus brefs délais pour organiser une démonstration personnalisée.</p>
          
          <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; color: #1e40af;"><strong>Prochaines étapes :</strong></p>
            <ol style="margin: 10px 0 0 0; color: #374151;">
              <li>Analyse de vos besoins par notre équipe</li>
              <li>Prise de contact sous 24-48h</li>
              <li>Planification d'une démonstration personnalisée</li>
            </ol>
          </div>
          
          <p style="margin: 20px 0;">Cordialement,<br><strong>L'équipe Byss VNS</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Si vous avez des questions urgentes, contactez-nous au +33 1 23 45 67 89<br>
            ou par email à contact@byssvns.com
          </p>
        </div>
      `,
    });

    // Send notification email to team
    const teamEmailResponse = await resend.emails.send({
      from: "Byss VNS Contact <contact@byssvns.com>",
      to: ["equipe@byssvns.com"],
      subject: `Nouvelle demande de démonstration - ${formData.institution}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626; margin-bottom: 20px;">Nouvelle demande de démonstration</h1>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Informations du contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Nom :</td><td style="padding: 8px 0;">${formData.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email :</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Téléphone :</td><td style="padding: 8px 0;"><a href="tel:${formData.phone}">${formData.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Institution :</td><td style="padding: 8px 0;">${formData.institution}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Rôle :</td><td style="padding: 8px 0;">${formData.role}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Nb étudiants :</td><td style="padding: 8px 0;">${formData.studentCount}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Délai :</td><td style="padding: 8px 0;">${formData.timeline}</td></tr>
            </table>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="margin-top: 0; color: #92400e;">Message du prospect :</h3>
            <p style="margin: 0; white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 25px; padding: 15px; background-color: #ecfdf5; border-radius: 8px;">
            <p style="margin: 0; color: #065f46;"><strong>Action requise :</strong> Contacter ce prospect dans les 24h pour programmer une démonstration.</p>
          </div>
        </div>
      `,
    });

    console.log("User email sent:", userEmailResponse);
    console.log("Team email sent:", teamEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails envoyés avec succès" 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);