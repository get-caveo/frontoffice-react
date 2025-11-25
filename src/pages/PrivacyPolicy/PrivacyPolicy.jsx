import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>Politique de Confidentialité</h1>
          <p className="last-updated">Dernière mise à jour : 25 novembre 2025</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              NegoSud, éditeur de la solution Caveo (ci-après "nous", "notre" ou "la Société") s'engage à protéger et à respecter 
              votre vie privée. Cette politique de confidentialité explique comment nous collectons, 
              utilisons, divulguons et protégeons vos informations personnelles lorsque vous utilisez 
              notre plateforme B2B de vente de vins.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Informations que nous collectons</h2>
            <h3>2.1 Informations que vous nous fournissez</h3>
            <ul>
              <li>Informations d'identification : nom, prénom, raison sociale</li>
              <li>Coordonnées : adresse email, numéro de téléphone, adresse postale</li>
              <li>Informations professionnelles : SIRET, numéro de TVA intracommunautaire</li>
              <li>Informations de paiement : détails de carte bancaire (cryptés)</li>
              <li>Informations de commande : historique d'achats, préférences</li>
            </ul>

            <h3>2.2 Informations collectées automatiquement</h3>
            <ul>
              <li>Données de navigation : adresse IP, type de navigateur, pages visitées</li>
              <li>Cookies et technologies similaires</li>
              <li>Données d'utilisation de la plateforme</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Comment nous utilisons vos informations</h2>
            <p>Nous utilisons vos informations personnelles pour :</p>
            <ul>
              <li>Traiter vos commandes et gérer votre compte client</li>
              <li>Communiquer avec vous concernant vos commandes et notre service</li>
              <li>Améliorer notre plateforme et nos services</li>
              <li>Vous envoyer des informations marketing (avec votre consentement)</li>
              <li>Respecter nos obligations légales et réglementaires</li>
              <li>Prévenir la fraude et assurer la sécurité de notre plateforme</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Base légale du traitement</h2>
            <p>Nous traitons vos données personnelles sur les bases légales suivantes :</p>
            <ul>
              <li><strong>Exécution du contrat :</strong> pour traiter vos commandes</li>
              <li><strong>Obligation légale :</strong> pour la comptabilité et la fiscalité</li>
              <li><strong>Intérêt légitime :</strong> pour améliorer nos services</li>
              <li><strong>Consentement :</strong> pour les communications marketing</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Partage de vos informations</h2>
            <p>Nous pouvons partager vos informations avec :</p>
            <ul>
              <li><strong>Prestataires de services :</strong> transporteurs, processeurs de paiement</li>
              <li><strong>Autorités légales :</strong> si requis par la loi</li>
              <li><strong>Partenaires commerciaux :</strong> producteurs de vin (avec votre consentement)</li>
            </ul>
            <p>
              Nous ne vendons jamais vos données personnelles à des tiers à des fins marketing.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Sécurité de vos données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
              appropriées pour protéger vos données personnelles contre tout accès non autorisé, 
              modification, divulgation ou destruction :
            </p>
            <ul>
              <li>Chiffrement SSL/TLS pour toutes les transmissions de données</li>
              <li>Authentification sécurisée et contrôle d'accès</li>
              <li>Audits de sécurité réguliers</li>
              <li>Formation du personnel sur la protection des données</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour :
            </p>
            <ul>
              <li>Fournir nos services (durée du compte actif)</li>
              <li>Respecter nos obligations légales (10 ans pour les données comptables)</li>
              <li>Résoudre les litiges et faire respecter nos accords</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la limitation :</strong> restreindre le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit de retirer votre consentement :</strong> à tout moment</li>
            </ul>
            <p>
              Pour exercer vos droits, contactez-nous à : <a href="mailto:privacy@caveo.fr">privacy@caveo.fr</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Cookies</h2>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience sur notre plateforme. 
              Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
            </p>
            <p>Types de cookies utilisés :</p>
            <ul>
              <li>Cookies essentiels (nécessaires au fonctionnement du site)</li>
              <li>Cookies de performance (analyse de l'utilisation)</li>
              <li>Cookies fonctionnels (mémorisation des préférences)</li>
              <li>Cookies marketing (avec votre consentement)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>10. Transferts internationaux</h2>
            <p>
              Vos données sont stockées au sein de l'Union Européenne. En cas de transfert 
              hors UE, nous nous assurons que des garanties appropriées sont en place.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité périodiquement. 
              La date de la dernière mise à jour est indiquée en haut de cette page. 
              Nous vous informerons de tout changement significatif.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Contact</h2>
            <p>Pour toute question concernant cette politique de confidentialité :</p>
            <div className="contact-info">
              <p><strong>NegoSud</strong></p>
              <p>Solution Caveo</p>
              <p>123 Route des Vignobles</p>
              <p>51000 Châlons-en-Champagne</p>
              <p>Email : <a href="mailto:privacy@negosud.fr">privacy@negosud.fr</a></p>
              <p>Téléphone : +33 1 23 45 67 89</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>13. Autorité de contrôle</h2>
            <p>
              Vous avez le droit de déposer une plainte auprès de la Commission Nationale 
              de l'Informatique et des Libertés (CNIL) si vous estimez que le traitement 
              de vos données personnelles constitue une violation du RGPD.
            </p>
            <div className="contact-info">
              <p><strong>CNIL</strong></p>
              <p>3 Place de Fontenoy - TSA 80715</p>
              <p>75334 PARIS CEDEX 07</p>
              <p>Téléphone : +33 1 53 73 22 22</p>
              <p>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
