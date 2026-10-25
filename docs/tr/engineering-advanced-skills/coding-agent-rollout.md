---
skill: coding-agent-rollout
title: Claude Code'u ekibe yaymak
source: skills/coding-agent-rollout/SKILL.md
upstreamCommit: 6d2f02ea077eead1bee5411a31bcc6db5a11a70c
---
## Ne yapar
Claude Code'u bir ekibe ya da şirkete yayarken, ya da devam eden bir yayılımı denetlerken kullanılır. Ayarlar beş farklı kapsamdan birleştiği için etkin politikayı tek bir dosyadan okumak mümkün değil; skill bunu okunur hale getirip kontrol eder. Dört script ile dört aşamada ilerler. Birincisi paylaşılan, yerel ve yönetilen settings.json dosyalarını birlikte denetler ve her komuta izin veren kuralları, önceden onaylanmış yıkıcı komutları ya da dosyaya yazılmış parolaları bulunca işi durdurur. İkincisi tüm MCP sunucularını, plugin'leri ve marketplace'leri onaylı listeyle karşılaştırır. Üçüncüsü hangi CLAUDE.md katmanlarının gerçekten yüklendiğini çözer. Dördüncüsü her üyenin yerel oturum verisinden sadece sayıları paylaşarak ekibin benimseme düzeyini ölçer, konuşma kayıtlarını asla toplamaz. Script'ler ağa çıkmaz ve hiçbir şeyi değiştirmez.

## Ne zaman kullanılır
- Ekip için ortak ya da yönetilen izin ayarlarını yazarken veya incelerken
- Hangi MCP sunucularının ve plugin'lerin onaylanacağına karar verirken
- Birbirine karışmış CLAUDE.md dosyalarını temizlerken
- Ekibin Claude Code'u gerçekten kullanıp kullanmadığını ölçmek için

## Örnek
```
/engineering-advanced-skills:coding-agent-rollout managed-settings.json
```

## İlgili skill'ler
- `skill-security-auditor`: Onaylamadan önce bir skill'in güvenli olup olmadığını denetlemek için.
- `env-secrets-manager`: Ayarlarda ve repoda sızmış gizli bilgileri bulmak için.
- `secrets-vault-manager`: Gizli bilgileri merkezi bir kasaya taşımak için.
