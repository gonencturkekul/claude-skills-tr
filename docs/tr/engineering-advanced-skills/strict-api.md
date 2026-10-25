---
skill: strict-api
title: Uydurma API'ye karşı doğrulama
source: strict-api/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Kod yazılmadan önce devreye giren bir gerçeklik kontrolü katmanıdır. Claude'un, senin kullandığın sürümde gerçekten var olduğunu bilmediği bir fonksiyonu, import'u veya metodu yazmasını engeller. Her API çağrısı için şu soruyu sorar: bu, kullanıcının çalıştırdığı sürümde var mı? Cevap "galiba" ise durur ve bilmediğini söyler. Engellediği tipik hatalar: hiç var olmayan metotlar, başka bir dilin standart kütüphanesinden ödünç alınan isimler, birbirine benzeyen framework'lerin karıştırılması (Flask ile Django gibi) ve kullanımdan kalkmış API'ler. Akış şöyledir: yazılacak koddaki tüm import ve çağrıları belirle, her birini belirttiğin sürüme göre doğrula, sürüm yoksa bir kez sor, emin olunamayan yerlere satır içi bir doğrulama yorumu ekle. Kısa ama yanlış kod yerine uzun ama doğru kodu tercih eder.

## Ne zaman kullanılır
- "Uydurma", "API'leri doğrula" veya "olmayan fonksiyon yazma" dediğinde
- Az bilinen bir kütüphane veya belirli bir sürümle çalışırken
- Önceki cevaplarda var olmayan metotlarla karşılaştıysan

## Örnek
```
Node 18 kullanıyorum, dosyayı satır satır okuyan kodu yaz ama yalnızca gerçekten var olan API'leri kullan
```

## İlgili skill'ler
- `minimalist`: Birlikte kullanılır; o kodu azaltır, strict-api yazılanın doğru olmasını sağlar.
- `focused-fix`: Uydurma bir çağrının yol açtığı hatayı sistematik olarak onarmak için.
- `dependency-auditor`: Hangi paket sürümünün kurulu olduğunu netleştirmek için.
