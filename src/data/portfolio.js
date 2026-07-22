// Portfolio gallery items.
// These use high-quality Unsplash placeholders so the site looks alive today.
// Replace `src` with your own image paths (e.g. /gallery/wedding-01.jpg) once
// you drop files into the /public folder, the layout adapts automatically.

export const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'model', label: 'Model' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'events', label: 'Events' },
]

const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const portfolio = [
  { id: 1, category: 'wedding', title: 'The First Look', src: u('photo-1519741497674-611481863552'), span: 'tall' },
  { id: 2, category: 'model', title: 'Studio Editorial', src: u('photo-1524504388940-b1c1722653e1') },
  { id: 3, category: 'bridal', title: 'Getting Ready', src: u('photo-1595777457583-95e059d581b8'), span: 'wide' },
  { id: 4, category: 'commercial', title: 'Product Story', src: u('photo-1441986300917-64674bd600d8') },
  { id: 5, category: 'birthday', title: 'Golden Hour Party', src: u('photo-1530103862676-de8c9debad1d') },
  { id: 6, category: 'model', title: 'Street Portrait', src: u('photo-1488161628813-04466f872be2'), span: 'tall' },
  { id: 7, category: 'wedding', title: 'The Vows', src: u('photo-1511285560929-80b456fea0bc') },
  { id: 8, category: 'events', title: 'Engagement Evening', src: u('photo-1465495976277-4387d4b0b4c6'), span: 'wide' },
  { id: 9, category: 'bridal', title: 'Veil & Light', src: u('photo-1594552072238-b8a33785b261') },
  { id: 10, category: 'commercial', title: 'Brand Campaign', src: u('photo-1523275335684-37898b6baf30') },
  { id: 11, category: 'model', title: 'Fashion Movement', src: u('photo-1483985988355-763728e1935b'), span: 'tall' },
  { id: 12, category: 'birthday', title: 'First Birthday', src: u('photo-1464349095431-e9a21285b5f3') },
  { id: 13, category: 'wedding', title: 'The Send Off', src: u('photo-1470784789206-3d76d4b5dae0'), span: 'wide' },
  { id: 14, category: 'events', title: 'Maternity Glow', src: u('photo-1519689680058-324335c77eba') },
]
