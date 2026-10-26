import Image from "next/image";

/**
 * Image fixe derrière tout le site (cerveau + réseau de neurones).
 * Un élément `position: fixed` plutôt que `background-attachment: fixed`,
 * qui saccade ou est ignoré sur mobile. Un voile garde le texte lisible.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
      <Image
        src="/fond/cerveau-reseau.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_35%] opacity-55 light:opacity-[0.12] light:saturate-50"
      />
      {/* Voile : plus dense en bas pour les sections longues */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(7_11_26/0.35),rgb(7_11_26/0.7)_60%,rgb(7_11_26/0.85))] light:bg-[linear-gradient(to_bottom,rgb(247_247_252/0.55),rgb(247_247_252/0.8))]" />
    </div>
  );
}
