import './TermsOfService.css'

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1>Conditions Générales de Vente</h1>
          <p className="last-updated">Dernière mise à jour : 25 novembre 2025</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations 
              contractuelles entre NegoSud, éditeur de la solution Caveo (ci-après "le Vendeur") et tout professionnel 
              revendeur (ci-après "l'Acheteur") effectuant un achat de vins sur la plateforme 
              Caveo.
            </p>
            <p>
              Toute commande implique l'acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Identification du Vendeur</h2>
            <div className="contact-info">
              <p><strong>NegoSud</strong></p>
              <p>Solution Caveo</p>
              <p>Société par Actions Simplifiée au capital de 100 000€</p>
              <p>SIRET : 123 456 789 00010</p>
              <p>TVA intracommunautaire : FR 12 123456789</p>
              <p>Siège social : 123 Route des Vignobles, 51000 Châlons-en-Champagne</p>
              <p>Email : contact@negosud.fr</p>
              <p>Téléphone : +33 1 23 45 67 89</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>3. Conditions d'accès</h2>
            <p>
              La plateforme Caveo est exclusivement réservée aux professionnels revendeurs 
              de vins disposant :
            </p>
            <ul>
              <li>D'un numéro SIRET valide</li>
              <li>D'une licence appropriée pour la vente d'alcool</li>
              <li>D'un numéro de TVA intracommunautaire (le cas échéant)</li>
            </ul>
            <p>
              L'Acheteur garantit la véracité des informations fournies lors de son inscription.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Commandes</h2>
            <h3>4.1 Processus de commande</h3>
            <p>
              Les commandes s'effectuent en ligne via la plateforme Caveo. L'Acheteur :
            </p>
            <ul>
              <li>Sélectionne les produits et quantités souhaitées</li>
              <li>Valide son panier</li>
              <li>Confirme l'adresse de livraison</li>
              <li>Choisit le mode de paiement</li>
              <li>Valide définitivement la commande</li>
            </ul>

            <h3>4.2 Confirmation de commande</h3>
            <p>
              Toute commande fait l'objet d'une confirmation par email. Le contrat est 
              réputé formé à la réception de cette confirmation.
            </p>

            <h3>4.3 Quantités minimales</h3>
            <p>
              Certains produits peuvent être soumis à des quantités minimales de commande, 
              indiquées sur la fiche produit.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Prix</h2>
            <p>
              Les prix sont indiqués en euros, hors taxes. La TVA applicable sera ajoutée 
              lors de la validation de la commande.
            </p>
            <ul>
              <li>Prix HT : prix affiché sur la plateforme</li>
              <li>TVA : taux en vigueur (20% pour les vins)</li>
              <li>Prix TTC : prix HT + TVA</li>
            </ul>
            <p>
              Les prix peuvent être modifiés à tout moment mais les commandes sont facturées 
              aux prix en vigueur au moment de leur validation.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Paiement</h2>
            <h3>6.1 Modalités de paiement</h3>
            <p>Le paiement peut s'effectuer par :</p>
            <ul>
              <li>Carte bancaire (paiement sécurisé)</li>
              <li>Virement bancaire</li>
              <li>Prélèvement SEPA (après accord préalable)</li>
            </ul>

            <h3>6.2 Délais de paiement</h3>
            <p>
              Sauf conditions particulières convenues par écrit, le paiement est dû 
              à la commande. Pour les clients réguliers, des conditions de paiement 
              différé peuvent être négociées.
            </p>

            <h3>6.3 Retard de paiement</h3>
            <p>
              En cas de retard de paiement, des pénalités de retard égales à trois fois 
              le taux d'intérêt légal seront appliquées, ainsi qu'une indemnité forfaitaire 
              de 40€ pour frais de recouvrement.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Livraison</h2>
            <h3>7.1 Zone de livraison</h3>
            <p>
              Les livraisons sont effectuées en France métropolitaine et dans l'Union Européenne.
            </p>

            <h3>7.2 Délais de livraison</h3>
            <p>
              Les délais de livraison sont de 2 à 5 jours ouvrés pour la France métropolitaine, 
              à compter de la validation de la commande et du paiement.
            </p>
            <p>
              Ces délais sont donnés à titre indicatif et peuvent varier selon la destination 
              et la disponibilité des produits.
            </p>

            <h3>7.3 Frais de livraison</h3>
            <ul>
              <li>Gratuits pour les commandes supérieures à 500€ HT</li>
              <li>50€ HT pour les commandes inférieures à 500€ HT</li>
            </ul>

            <h3>7.4 Réception de la commande</h3>
            <p>
              L'Acheteur doit vérifier l'état de la marchandise à la réception et signaler 
              toute anomalie (colis endommagé, produits manquants) sur le bon de livraison 
              et par email dans les 48h.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Droit de rétractation</h2>
            <p>
              Conformément à l'article L221-3 du Code de la consommation, le droit de 
              rétractation ne s'applique pas aux contrats conclus entre professionnels.
            </p>
            <p>
              Toutefois, en cas de produit défectueux ou non conforme, l'Acheteur peut 
              faire valoir la garantie légale de conformité (voir article 9).
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Garanties</h2>
            <h3>9.1 Garantie de conformité</h3>
            <p>
              Le Vendeur garantit la conformité des produits livrés à la commande. 
              En cas de non-conformité, l'Acheteur peut demander :
            </p>
            <ul>
              <li>Le remplacement du produit</li>
              <li>Le remboursement</li>
            </ul>

            <h3>9.2 Produits défectueux</h3>
            <p>
              Les réclamations pour produits défectueux doivent être formulées dans 
              les 7 jours suivant la réception, avec photos à l'appui.
            </p>

            <h3>9.3 Retours</h3>
            <p>
              Les retours de produits conformes ne sont pas acceptés, sauf accord 
              exceptionnel du Vendeur. Les frais de retour sont à la charge de l'Acheteur 
              sauf en cas de produit défectueux ou non conforme.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Responsabilité</h2>
            <p>
              Le Vendeur ne saurait être tenu responsable :
            </p>
            <ul>
              <li>Des retards ou défauts de livraison dus au transporteur</li>
              <li>De l'impossibilité d'accès au site en cas de force majeure</li>
              <li>Des dommages indirects résultant de l'utilisation des produits</li>
            </ul>
            <p>
              L'Acheteur est seul responsable du respect de la réglementation applicable 
              à la revente des produits achetés, notamment en matière de licences et 
              d'âge légal de consommation.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Force majeure</h2>
            <p>
              Les parties ne pourront être tenues responsables si la non-exécution ou 
              le retard dans l'exécution de l'une de leurs obligations résulte d'un cas 
              de force majeure au sens de l'article 1218 du Code civil.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Propriété intellectuelle</h2>
            <p>
              Tous les éléments de la plateforme Caveo (textes, images, logos, etc.) 
              sont protégés par le droit de la propriété intellectuelle. Toute reproduction 
              ou utilisation sans autorisation est interdite.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Données personnelles</h2>
            <p>
              Les données personnelles collectées font l'objet d'un traitement conforme 
              au RGPD. Pour plus d'informations, consultez notre 
              <a href="/privacy-policy"> Politique de Confidentialité</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Règlement des litiges</h2>
            <h3>14.1 Droit applicable</h3>
            <p>
              Les présentes CGV sont soumises au droit français.
            </p>

            <h3>14.2 Médiation</h3>
            <p>
              En cas de litige, les parties s'efforceront de trouver une solution amiable. 
              À défaut, le litige pourra être soumis à médiation.
            </p>

            <h3>14.3 Juridiction compétente</h3>
            <p>
              En cas d'échec de la médiation, tout litige relatif à l'interprétation ou 
              à l'exécution des présentes CGV sera de la compétence exclusive des tribunaux 
              de Châlons-en-Champagne.
            </p>
          </section>

          <section className="legal-section">
            <h2>15. Modifications des CGV</h2>
            <p>
              Le Vendeur se réserve le droit de modifier les présentes CGV à tout moment. 
              Les CGV applicables sont celles en vigueur à la date de la commande.
            </p>
          </section>

          <section className="legal-section">
            <h2>16. Contact</h2>
            <p>Pour toute question concernant les présentes CGV :</p>
            <div className="contact-info">
              <p><strong>Service Client NegoSud</strong></p>
              <p>Solution Caveo</p>
              <p>Email : <a href="mailto:contact@negosud.fr">contact@negosud.fr</a></p>
              <p>Téléphone : +33 1 23 45 67 89</p>
              <p>Horaires : Lundi - Vendredi, 9h00 - 18h00</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
