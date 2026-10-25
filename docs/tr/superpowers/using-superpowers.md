---
skill: using-superpowers
title: Skill'leri kullanma kuralı
source: skills/using-superpowers/SKILL.md
upstreamCommit: 2ce8aa15d05bd57213e6f746f953aafb7ded7a8b
---
## Ne yapar
superpowers'ın temel kuralını koyar: Claude bir şey yapmadan, hatta netleştirici bir soru sormadan ya da dosyalara bakmadan önce uygun bir skill olup olmadığını kontrol eder ve varsa onu çağırır. Bir skill'in işe yarama ihtimali çok düşük bile olsa çağrılması beklenir, uygun olmadığı anlaşılırsa kullanılmayabilir. Birden fazla skill uyuyorsa önce yaklaşımı belirleyen süreç skill'leri gelir: "şunu yapalım" denince önce beyin fırtınası, "şu hatayı düzelt" denince önce sistematik hata ayıklama, sonra alana özgü skill'ler. Plan moduna girmeden önce beyin fırtınası yapılmamışsa onu çağırır. "Bu basit bir soru" ya da "önce koda bir bakayım" gibi düşünceleri skill kontrolünü atlamak için uydurulan bahaneler olarak listeler. Claude Code, Codex ve diğer ortamlar için ayrı uyarlama dosyalarına yönlendirir. CLAUDE.md gibi kullanıcı talimatları skill'lerden önce gelir. Alt ajan olarak çalışan bir ajan bu skill'i yok sayar. Plugin bunu her oturum başında otomatik yükler.

## Ne zaman kullanılır
- Her konuşmanın başında, otomatik olarak
- Skill'lerin neden devreye girmediğini anlamak istediğinde
- Hangi skill'in önce geleceğini merak ettiğinde
- superpowers'ın genel mantığını öğrenmek için

## Örnek
```
/superpowers:using-superpowers
```

## İlgili skill'ler
- `brainstorming`: İnşa isteklerinde ilk çağrılan süreç skill'i.
- `systematic-debugging`: Hata bildirimlerinde ilk çağrılan süreç skill'i.
- `diagnosing-superpowers`: Bir skill beklenen yerde çalışmadıysa incelemek için.
