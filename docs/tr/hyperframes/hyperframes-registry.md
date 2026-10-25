---
skill: hyperframes-registry
title: Hazır blok ve bileşen kataloğu
source: skills/hyperframes-registry/SKILL.md
upstreamCommit: 7bc363c87c8524e547c5b759d2471d96183b67f3
---
## Ne yapar
Yaklaşık 450 hazır parçayı projene düzenlenebilir kaynak kod olarak ekler. İki tür var: kendi zaman çizelgesi olan bloklar (geçişler, alt yazı bantları, başlık kartları, sohbet ve arayüz kartları, grafik ve harita sahneleri, 3D arka planlar) ve sahnene kopyalanan bileşenler (metin efektleri, altyazı stilleri, kamera hareketleri, doku ve parçacıklar). Arama `catalog --query` ile yerel olarak yapılır ve dışarıya bir şey göndermez. Sorgular İngilizce yazılmalı, çünkü katalog İngilizce dizinleniyor. Anlama göre sıralayan arama için yaklaşık 33 MB'lık tek seferlik bir indirme gerekir, bu kararı sana bırakır. Bulunan parça `add` ile kurulur, bloklar `compositions/` altına, bileşenler `compositions/components/` altına yazılır. Değişkenleri marka renk ve fontlarına bağlanabilir. Uygun bir şey çıkmazsa elle yazmadan önce bu eksikliği geri bildirim olarak raporlar.

## Ne zaman kullanılır
- Glitch, film greni, CRT çizgileri gibi adı olan bir efekti elle yazmadan önce
- Hazır bir geçiş, başlık kartı ya da grafik arıyorsan
- Müziğin vuruşlarına senkron bir blok kullanmak istediğinde
- Kataloğa yeni bir blok katkısı hazırlıyorsan

## Örnek
```
Videoya eski kamera kaydı havası veren hazır bir overlay bul ve ekle
```

## İlgili skill'ler
- `hyperframes`: Eklenen parçaların uyması gereken kurallar için.
- `hyperframes-cli`: `catalog`, `add` ve `beats` komutları için.
