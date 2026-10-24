---
command: colorize
title: Stratejik renk ekleme
source: reference/colorize.md
upstreamCommit: dad8dbb3aac21ad1fa236c110315ef4abece23e8
---
## Ne yapar
Fazla gri veya tek düze kalmış bir arayüze hiyerarşi, anlam ve atmosfer taşıyan renk ekler. Önce DESIGN.md'yi, token'ları ve mevcut temaları okuyup marka renklerini ve renk rollerini çıkarır, sonra rastgele renkler yerine rol bazlı bir palet kurar (yüzey, metin, aksiyon, durum renkleri gibi). Yeni web paletlerinde OKLCH tercih eder. Kontrastı WCAG AA'ya göre doğrular, light ve dark temayı ayrı ayrı tasarlar. Mevcut görsel kimliği değiştirmez; yeni bir kimlik gerekiyorsa ayrı bir akışa yönlendirir.

## Ne zaman kullanılır
- Arayüz soluk, gri veya sıcaklıktan yoksun görünüyorsa.
- Durumlar ve aksiyonlar renk olmadığı için ayırt edilemiyorsa.
- Grafik veya veri görselleştirmeleri için renk skalası gerekiyorsa.

## Örnek
```
/impeccable colorize kontrol paneli kenar çubuğu
```

## İlgili komutlar
- `bolder`: Etkiyi renk dışındaki araçlarla da artırır.
- `audit`: Kontrast ve hard-coded renk sorunlarını raporlar.
- `polish`: Palet yerine oturduktan sonra son geçişi yapar.
