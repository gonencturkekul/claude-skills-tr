---
skill: interview-system-designer
title: İşe alım mülakat süreci tasarımı
source: skills/interview-system-designer/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Adına rağmen sistem tasarımı mülakatına hazırlanmakla ilgili değildir; işe alım için yapılandırılmış mülakat süreçleri kurar. Rol ve seviyeye göre bir mülakat döngüsü planlar, her turun odağını ve süresini önerir, tur türüne göre soru setleri verir. `interview_planner.py` betiği rol adı ve seviyeden (junior, mid, senior, staff) bir başlangıç planı üretir, istersen JSON olarak. Önerilen akış: planı çıkar, turları role özgü yetkinliklere bağla, puanlama rubriğini panel liderleriyle tutarlı hale getir, yayına almadan önce önyargı kontrollerini gözden geçir, işe alım sonuçlarına bakarak her çeyrekte yeniden kalibre et. Referanslarda yetkinlik matrisi şablonları, önyargı azaltma listesi ve değerlendirme toplantısı rehberi bulunur.

## Ne zaman kullanılır
- Yeni bir pozisyon için mülakat döngüsü kurarken
- Soru bankası ya da puanlama rubriği hazırlarken
- Mülakatçılar arasında puanlar tutarsızsa ve kalibrasyon gerekiyorsa
- Süreçteki önyargıları azaltmak istediğinde

## Örnek
```
Senior backend mühendisi için 4 turluk bir mülakat döngüsü ve puanlama rubriği hazırla
```

## İlgili skill'ler
- `codebase-onboarding`: İşe alınan kişinin ilk haftası için onboarding dokümanı üretmek için.
- `self-eval`: Hazırlanan süreci dürüstçe değerlendirmek için.
