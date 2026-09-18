import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import type { Lead } from '../types';
import { calculateScore, scoreLabel, scoreReason } from '../lib/score';
import { generatePitch } from '../lib/pitch';
import { hasWhatsapp } from '../lib/whatsapp';
import { Modal } from './Modal';

interface Props {
  onClose: () => void;
  onAdd: (lead: Lead) => void;
}

export function AddLeadModal({ onClose, onAdd }: Props) {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('2500');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !phone.trim()) return;
    const scoreInput = { hasWebsite: false, rating: 0, reviewsCount: 0 };
    const aiScore = calculateScore(scoreInput);
    const base = {
      name: company.trim(),
      category: 'Negócios locais',
      city: '',
      rating: 0,
      reviewsCount: 0,
      hasWebsite: false,
      decisionMaker: { name: contact.trim() || 'Sócio / Proprietário', role: 'Contato principal' },
    };
    onAdd({
      ...base,
      id: `manual-${Date.now()}`,
      state: '',
      address: '',
      phone: phone.trim(),
      whatsapp: phone.trim(),
      hasWhatsapp: hasWhatsapp(phone),
      website: '',
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.trim())}`,
      aiScore,
      aiScoreLabel: scoreLabel(aiScore),
      aiReason: scoreReason(scoreInput),
      stage: 'novo',
      suggestedPitch: generatePitch(base),
      dealValue: Math.max(0, Number(value) || 0),
    });
  };

  return (
    <Modal title="Adicionar Lead" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label" htmlFor="al-company">Empresa *</label>
          <input id="al-company" className="input" value={company} onChange={(e) => setCompany(e.target.value)} required autoFocus />
        </div>
        <div>
          <label className="label" htmlFor="al-contact">Nome do contato</label>
          <input id="al-contact" className="input" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Ex.: Maria" />
        </div>
        <div>
          <label className="label" htmlFor="al-phone">WhatsApp *</label>
          <input id="al-phone" className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 90000-0000" required />
        </div>
        <div>
          <label className="label" htmlFor="al-value">Valor do negócio (R$)</label>
          <input id="al-value" className="input" type="number" min={0} step={50} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary w-full">
          <Plus className="h-4 w-4" /> Adicionar ao pipeline
        </button>
      </form>
    </Modal>
  );
}
