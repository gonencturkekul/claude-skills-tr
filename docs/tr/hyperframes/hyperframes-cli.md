---
skill: hyperframes-cli
title: HyperFrames komut satırı
source: skills/hyperframes-cli/SKILL.md
upstreamCommit: 7bc363c87c8524e547c5b759d2471d96183b67f3
---
## Ne yapar
`npx hyperframes` komutlarını işe göre gruplar: proje başlatma, okuma, kontrol, kareye bakma, zaman çizelgesini düzenleme, medya, önizleme ve yayınlama. Önerdiği döngü: yazdıktan sonra `lint`, ardından `check --json` ile tüm hataları kapatmak, `snapshot` ile çekilen PNG'lere bakmak, önizleme adresini sana verip beklemek ve onay gelince render almak. Render sonrası dosyanın boş olmadığını ve süresinin videonun tanımlı süresiyle eşleştiğini doğrular. Zaman çizelgesi düzenlemeleri (taşıma, kırpma, bölme, silme) önce `--plan` ile önizlenir ve her işlem geri alınabilir bir makbuz bırakır. Render yerel olarak, Docker içinde, değişkenlerden toplu halde, barındırılan bulut servisinde ya da kendi AWS veya GCP hesabında yapılabilir. Chrome açılmaması, yavaş render ya da disk dolması gibi sorunlar için hazır çözümler içerir. Node.js 22+ ve FFmpeg gerekir.

## Ne zaman kullanılır
- Bir komutun ne işe yaradığını ya da hangi bayrağı alacağını bilmediğinde
- Kontrol ya da render hatası aldığında
- Bir klibi komutla taşımak, kırpmak veya bölmek istediğinde
- Videoyu bulutta ya da toplu olarak render etmek için

## Örnek
```
/hyperframes:hyperframes-cli render neden boş çıkıyor, kontrol edip düzelt
```

## İlgili skill'ler
- `hyperframes`: Komutların uyguladığı render kuralları burada.
- `hyperframes-registry`: `catalog` ve `add` komutlarının ayrıntısı için.
- `media-use`: Ses, görsel ve renk işleme komutları için.
