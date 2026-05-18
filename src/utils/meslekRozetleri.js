export const ONEMLI_MESLEKLER = {
  'Berber':{ikon:'✂️',renk:'#E30A17',renk2:'#FFFFFF'},
  'Kuaför':{ikon:'💇',renk:'#FF69B4',renk2:'#FFD700'},
  'Saç Stilisti':{ikon:'💇',renk:'#FF69B4',renk2:'#FFD700'},
  'Makyaj Artisti':{ikon:'⭐',renk:'#FF1493',renk2:'#FFD700'},
  'Gelin Makyajı Uzmanı':{ikon:'💍',renk:'#FF69B4',renk2:'#FFD700'},
  'Kalıcı Makyaj Uzmanı':{ikon:'⭐',renk:'#DA70D6',renk2:'#FFD700'},
  'Estetisyen':{ikon:'👤',renk:'#DA70D6',renk2:'#FFFFFF'},
  'Cilt Bakım Uzmanı':{ikon:'🌿',renk:'#32CD32',renk2:'#FFFFFF'},
  'Masöz':{ikon:'💆',renk:'#9370DB',renk2:'#FFD700'},
  'Spa Terapisti':{ikon:'🌸',renk:'#FFB6C1',renk2:'#FFD700'},
  'Manikür-Pedikür Uzmanı':{ikon:'💅',renk:'#FF69B4',renk2:'#FFFFFF'},
  'Protez Tırnak Uzmanı':{ikon:'💅',renk:'#FF1493',renk2:'#FFFFFF'},
  'Doktor':{ikon:'🩺',renk:'#FFFFFF',renk2:'#00A86B'},
  'Diş Hekimi':{ikon:'🦷',renk:'#F0F8FF',renk2:'#4169E1'},
  'Estetik Cerrah':{ikon:'💉',renk:'#4169E1',renk2:'#FFFFFF'},
  'Psikolog':{ikon:'🧠',renk:'#6A0DAD',renk2:'#FFFFFF'},
  'Personal Trainer':{ikon:'💪',renk:'#FF4500',renk2:'#000000'},
  'Yoga Eğitmeni':{ikon:'🧘',renk:'#9370DB',renk2:'#FFFFFF'},
  'Mühendis':{ikon:'⚙️',renk:'#4682B4',renk2:'#FFD700'},
  'Yazılımcı':{ikon:'💻',renk:'#2F4F4F',renk2:'#00FF7F'},
  'Web Geliştirici':{ikon:'💻',renk:'#1C1C1C',renk2:'#61DAFB'},
  'Mimar':{ikon:'📐',renk:'#8B4513',renk2:'#FFD700'},
  'Şef':{ikon:'👨‍🍳',renk:'#DC143C',renk2:'#FFFFFF'},
  'Pasta Şefi':{ikon:'🎂',renk:'#FFB6C1',renk2:'#FF1493'},
  'Fırıncı':{ikon:'🥖',renk:'#DEB887',renk2:'#8B4513'},
  'Öğretmen':{ikon:'🎓',renk:'#4B0082',renk2:'#FFD700'},
  'Avukat':{ikon:'⚖️',renk:'#000000',renk2:'#FFD700'},
  'Galerici':{ikon:'🚗',renk:'#1C1C1C',renk2:'#C0C0C0'},
  'Stil Danışmanı':{ikon:'👗',renk:'#FF1493',renk2:'#000000'},
  'Fotoğrafçı':{ikon:'📸',renk:'#2F2F2F',renk2:'#FFD700'},
  'Dövme Sanatçısı':{ikon:'🖊️',renk:'#000000',renk2:'#FF4500'},
};

export const MUSTERI_ROZETI = {ikon:'👤',renk:'#FFD700',renk2:'#FFA500'};

export function rozetAl(meslek, hesapTuru) {
  if (hesapTuru !== 'profesyonel' && hesapTuru !== 'Profesyonel') return MUSTERI_ROZETI;
  if (!meslek) return MUSTERI_ROZETI;
  return ONEMLI_MESLEKLER[meslek] || {ikon:'💼',renk:'#4A90E2',renk2:'#FFD700'};
}
