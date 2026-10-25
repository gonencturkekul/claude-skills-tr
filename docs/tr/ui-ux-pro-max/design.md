---
skill: design
title: Kapsamlı tasarım skill'i
source: .claude/skills/design/SKILL.md
upstreamCommit: d14efff8ed1faa4187f004f79926f428c8074ec7
---
## Ne yapar
Birçok tasarım işini tek çatıda toplayan bir yönlendirici. Marka, token ve arayüz işlerini paketteki `brand`, `design-system` ve `ui-styling` skill'lerine yollar, geri kalanını kendisi yapar. Logo tarafında 55'ten fazla stil, renk ve sektör rehberinden bir tasarım özeti çıkarır ve logoyu Gemini, Atlas Cloud ya da MuAPI ile üretir. Kurumsal kimlik programında kartvizit ve antetli kağıt gibi teslimatların maketlerini üretir ve bunları bir HTML sunumda toplar. Ayrıca Chart.js'li HTML sunumlar, 22 stilde banner, Gemini ile SVG ikon ve HTML'den ekran görüntüsüyle çıkan sosyal medya görselleri hazırlar. Script'ler Python ile çalışır. Logo, kurumsal kimlik ve ikon üretimi için `GEMINI_API_KEY` gerekir, MuAPI için ayrı bir anahtar isteğe bağlıdır. Tam marka paketi ve yeni tasarım sistemi için adım adım akışlar sunar.

## Ne zaman kullanılır
- Yeni bir marka için logo ve kurumsal kimlik paketi istediğinde
- Bir uygulama için ikon seti ürettirmek için
- Birden çok platform için sosyal medya görseli gerektiğinde
- Hangi tasarım skill'ini kullanacağından emin olmadığında

## Örnek
```
/ui-ux-pro-max:design logo "Kumsal Kafe" sahil kafesi için vintage rozet tarzı
```

## İlgili skill'ler
- `brand`: Marka sesi ve kılavuzu için.
- `banner-design`: Yalnızca banner gerekiyorsa.
- `slides`: Yalnızca sunum gerekiyorsa.
- `ui-ux-pro-max`: Stil ve palet seçimi için.
