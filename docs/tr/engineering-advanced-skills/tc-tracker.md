---
skill: tc-tracker
title: Teknik değişiklik kaydı ve oturum devri
source: skills/tc-tracker/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Her kod değişikliğini yapılandırılmış bir JSON kaydı (Technical Change, TC) olarak tutar: neyin, neden, kim tarafından, ne zaman değiştiği, nasıl test edildiği ve işin nerede kaldığı. Kayıtlar projedeki `docs/TC/` klasöründe durur, bir şemaya ve durum makinesine göre doğrulanır. Durumlar planned, in_progress, implemented, tested ve deployed sırasıyla ilerler, araya blocked girebilir; geçersiz geçişlere izin verilmez. Beş Python script'i vardır: başlatma, kayıt oluşturma, güncelleme, durum görüntüleme ve doğrulama. Her güncelleme sıralı bir revizyon olarak eklenir, geçmiş hiç silinmez ve dosya atomik yazılır. En önemli parçası oturum devri bloğudur: ilerleme özeti, sıradaki adımlar, engeller, kritik kararlar ve yarım kalan dosyalar burada tutulur, böylece yeni bir AI oturumu işi kaldığı yerden alabilir. Kayıt güncellemeleri ana işi bölmemeli, kilometre taşlarında arka planda yapılmalıdır.

## Ne zaman kullanılır
- Kod değişiklikleri için denetlenebilir bir iz istediğinde
- Yarım kalan işi sonraki bir AI oturumuna devretmek için
- Commit mesajlarından daha ayrıntılı sürüm notları gerektiğinde
- Mevcut bir projenin geçmişini geriye dönük belgelemek için

## Örnek
```
Bu proje için TC takibini başlat ve JWT kimlik doğrulama işi için yeni bir kayıt aç
```

## İlgili skill'ler
- `changelog-generator`: Kullanıcıya yönelik sürüm notları için, TC ise ayrıntılı iz içindir.
- `tech-debt-tracker`: Tekil değişiklikler yerine uzun ömürlü teknik borç için.
- `focused-fix`: Hatayı önce sistematik onarıp sonucu bir TC olarak kaydetmek için.
