# Hotel Booking System

**EN:** A multi-step hotel booking wizard. Users choose travel details, configure hotel and meals for each day, and see a price summary.

**AZ:** Çoxaddımlı otel rezervasiya sehrbazı. İstifadəçilər səyahət məlumatlarını seçir, hər gün üçün otel və yeməkləri konfiqurasiya edir və qiymət xülasəsinə baxır.

---


# Azərbaycanca

## Ümumi baxış

Bu tətbiq 3 addımlı axınla işləyir:

1. **İlkin konfiqurasiya** — vətəndaşlıq, başlanğıc tarixi, gün sayı, təyinat ölkəsi, board tipi
2. **Gündəlik konfiqurasiya** — hər gün üçün otel və yeməklər
3. **Xülasə** — konfiqurasiya xülasəsi, gündəlik seçimlər və ümumi qiymət

Mock məlumatlara ölkələr, otellər, board tipləri və yeməklər daxildir (Türkiyə, BƏƏ, İtaliya).

## Xüsusiyyətlər

- Board tipinə görə yemək qaydaları (FB / HB / NB)
- Təmizlənə bilən yemək seçimləri (Half Board-da lunch/dinner dəyişmək üçün)
- Hər gün üçün qiymət bölgüsü və ümumi məbləğ
- Vəziyyət `localStorage`-da saxlanılır (səhifə yenilənəndə itmir)
- Wizard addımları üçün brauzerin geri/irəli dəstəyi
- Addımlar arası keçiddə loading göstəricisi (qısa delay + spinner)
- Çap / ixrac (`window.print()`)
- Responsive dizayn (desktop-da cədvəl, mobil-də kartlar)
- Jest ilə unit testlər

## Qurulum

**Tələblər:** Node.js 18+ və npm.

```bash
# Asılılıqları quraşdır
npm install

# Development serveri işə sal
npm run dev

# Production build
npm run build

# Production build-i önizlə
npm run preview

# Unit testləri işə sal
npm test

# Lint
npm run lint
```

Terminaldə göstərilən lokal ünvanı açın (adətən `http://localhost:5173`).

## Texnologiya seçimləri

| Texnologiya | Niyə |
|---|---|
| **React + TypeScript** | Aydın UI komponentləri və booking state üçün daha təhlükəsiz tiplər |
| **Vite** | Sürətli lokal development və sadə build |
| **Tailwind CSS** | Böyük CSS faylları olmadan sürətli və ardıcıl stilləşdirmə |
| **Context API + `useReducer`** | Bu layihə ölçüsü üçün kifayətdir; Redux əlavə boilerplate gətirərdi |
| **Jest** | Biznes qaydaları və qiymət məntiqi üçün sadə unit testlər |
| **`window.print()`** | jsPDF kimi ağır kitabxanalar olmadan çap/PDF |

## Memarlıq qərarları

### Wizard addımları

`WizardController` hər dəfə bir addımı göstərir. Booking state `BookingContext` içindədir və reducer ilə yenilənir (`SET_CONFIG`, `UPDATE_DAILY_SELECTION`, `NEXT_STEP`, `PREV_STEP`, `RESET` və s.).

Addım dəyişəndə məzmun dərhal dəyişmir. `useStepTransition` qısa bir loading göstərir, sonra yeni addımı render edir:

1. `activeStep` dəyişir → `isLoading = true`
2. `delay()` (`Promise` + `setTimeout`) ilə qısa gözləmə
3. `displayedStep` yenilənir → spinner gizlənir, məzmun `animate-fadeIn` ilə gəlir

Spinner `lucide-react` (`LoaderCircle`) və Tailwind `animate-spin` ilə hazırlanır. Delay util-i `src/utils/delay.ts`, keçid məntiqi isə `src/hooks/useStepTransition.ts` içindədir.

### Yemək qaydaları (Addım 2)

| Board tipi | Qayda |
|---|---|
| **FB (Full Board)** | Həm lunch, həm dinner seçilə bilər. Yeməklər məcburi deyil. |
| **HB (Half Board)** | Yalnız lunch **və ya** dinner (bir-birini istisna edir). Yeməklər məcburi deyil. İstifadəçi seçimi təmizləyib digər yeməyə keçə bilər. |
| **NB (No Board)** | Yemək dropdown-ları deaktivdir. |

Bir gün o zaman tamamlanır ki, **otel** seçilmiş olsun. Davam etmək üçün yemək məcburi deyil.

### Qiymətləndirmə

**Tapşırıq formulü (əsas):**

```text
Ümumi = hər gün üçün (otel qiyməti + seçilmiş yemək qiymətləri) cəmi
```

**Bu layihədəki əlavə:** vətəndaşlıq da qiymətə təsir edir.

Tapşırıq vətəndaşlığı toplayır, amma onun qiymət qaydasını yazmır. Bu layihədə kiçik bir cədvəl (`citizenshipMultipliers`) əlavə olunub ki, vətəndaşlığın təsiri aydın olsun:

| Vətəndaşlıq | Multiplikator |
|---|---|
| Türkiyə | 1.0 |
| İtaliya | 1.15 |
| BƏƏ | 1.25 |

```text
Ümumi = hər gün üçün ((otel qiyməti + seçilmiş yemək qiymətləri) × vətəndaşlıq multiplikatoru) cəmi
```

Half Board-da yalnız bir yemək hesablanır (state səhv olsa belə).

### Saxlama və tarixçə

- Bütün booking state hər dəyişiklikdə `localStorage`-a yazılır.
- Wizard addımları brauzer URL/tarixçəsi ilə sinxronlaşır; geri/irəli işləyir.

### Çap

Xülasə səhifəsi `window.print()` və print CSS istifadə edir; düymələr və artıq layout elementləri gizlədilir.

## Layihə strukturu

```text
src/
├── types/           # Domain tipləri (config, gündəlik seçim, board tipi)
├── data/            # Mock məlumatlar (ölkələr, otellər, yeməklər, multiplikatorlar)
├── context/         # Booking provider, reducer, storage, wizard tarixçəsi
├── hooks/           # useBooking, useMatchMedia, useStepTransition
├── utils/           # bookingRules, priceCalculator, dateFormatter, delay
├── components/
│   ├── common/      # Button, Input, Select
│   ├── layout/      # Header, Footer
│   └── wizard/      # Addım formaları və xülasə bölmələri
├── config/          # Tətbiq başlığı və təsviri
└── __tests__/       # Jest unit testləri
```

## Məlum məhdudiyyətlər və gələcək təkmilləşdirmələr

**Məhdudiyyətlər**

- Məlumatlar statik mock datadır (real backend və ya API yoxdur).
- Vətəndaşlıq multiplikatoru layihə əlavəsidir; orijinal tapşırıq formulünün bir hissəsi deyil.
- Çap brauzerin print dialoquna bağlıdır (ayrı PDF faylı yaradılmır).
- İstifadəçi autentifikasiyası və ödəniş axını yoxdur.
- Formada müddət 1–14 gün ilə məhdudlaşdırılıb.

**Mümkün təkmilləşdirmələr**

- Vətəndaşlıq multiplikatorunu silmək və ya opsional / konfiqurasiya edilə bilən etmək.
- React Testing Library ilə komponent testləri əlavə etmək.
- Otellər və yeməklər üçün real API-yə qoşulmaq.
- Daha yaxşı accessibility və i18n (çoxdilli UI).



---

# English

## Overview

This app follows a 3-step flow:

1. **Initial configuration** — citizenship, start date, number of days, destination country, board type
2. **Daily configuration** — hotel and meals for each day
3. **Summary** — configuration summary, daily selections, and total price

Mock data includes countries, hotels, board types, and meals (Turkey, UAE, Italy).

## Features

- Board type meal rules (FB / HB / NB)
- Clearable meal selects (useful for Half Board when switching lunch/dinner)
- Price breakdown per day and grand total
- State saved in `localStorage` (survives page refresh)
- Browser back/forward support for wizard steps
- Loading indicator between step transitions (short delay + spinner)
- Print / export summary (`window.print()`)
- Responsive layout (table on desktop, cards on mobile)
- Unit tests with Jest

## Setup

**Requirements:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm test

# Lint
npm run lint
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Technology Choices

| Technology | Why |
|---|---|
| **React + TypeScript** | Clear UI components and safer types for booking state |
| **Vite** | Fast local development and simple build |
| **Tailwind CSS** | Quick, consistent styling without large CSS files |
| **Context API + `useReducer`** | Enough for this app size; Redux would add extra boilerplate |
| **Jest** | Simple unit tests for business rules and price logic |
| **`window.print()`** | Print/PDF without heavy libraries like jsPDF |

## Architecture Decisions

### Wizard steps

`WizardController` shows one step at a time. Booking state lives in `BookingContext` and is updated through a reducer (`SET_CONFIG`, `UPDATE_DAILY_SELECTION`, `NEXT_STEP`, `PREV_STEP`, `RESET`, etc.).

When the step changes, content does not swap instantly. `useStepTransition` shows a short loading state, then renders the new step:

1. `activeStep` changes → `isLoading = true`
2. Brief wait via `delay()` (`Promise` + `setTimeout`)
3. `displayedStep` updates → spinner hides, content enters with `animate-fadeIn`

The spinner uses `lucide-react` (`LoaderCircle`) and Tailwind `animate-spin`. Delay lives in `src/utils/delay.ts`; transition logic lives in `src/hooks/useStepTransition.ts`.

### Meal rules (Step 2)

| Board type | Rule |
|---|---|
| **FB (Full Board)** | Lunch and dinner can both be selected. Meals are optional. |
| **HB (Half Board)** | Only lunch **or** dinner (mutually exclusive). Meals are optional. User can clear a selection and choose the other meal. |
| **NB (No Board)** | Meal dropdowns are disabled. |

A day is complete when a **hotel** is selected. Meals are not required to continue.

### Pricing

**Task formula (base):**

```text
Total = sum of (hotel price + selected meal prices) for each day
```

**Enhancement in this project:** citizenship also affects the price.

The task collects citizenship but does not define a price rule for it. This project adds a small lookup table (`citizenshipMultipliers`) so citizenship has a clear effect:

| Citizenship | Multiplier |
|---|---|
| Turkey | 1.0 |
| Italy | 1.15 |
| UAE | 1.25 |

```text
Total = sum of ((hotel price + selected meal prices) × citizenship multiplier) for each day
```

For Half Board, only one meal is charged even if state is invalid.

### Persistence and history

- Full booking state is saved to `localStorage` on every change.
- Wizard steps sync with the browser URL/history so back/forward works.

### Print

Summary uses native `window.print()` and print-only CSS to hide buttons and layout chrome.

## Project Structure

```text
src/
├── types/           # Domain types (config, daily selection, board type)
├── data/            # Mock data (countries, hotels, meals, multipliers)
├── context/         # Booking provider, reducer, storage, wizard history
├── hooks/           # useBooking, useMatchMedia, useStepTransition
├── utils/           # bookingRules, priceCalculator, dateFormatter, delay
├── components/
│   ├── common/      # Button, Input, Select
│   ├── layout/      # Header, Footer
│   └── wizard/      # Step forms and summary sections
├── config/          # App title and description
└── __tests__/       # Jest unit tests
```


## Known Limitations and Future Improvements

**Limitations**

- Data is static mock data (no real backend or API).
- Citizenship multiplier is a project enhancement, not part of the original task formula.
- Print depends on the browser print dialog (not a generated PDF file).
- No user authentication or payment flow.
- Duration is limited to 1–14 days in the form.

**Possible improvements**

- Remove or make the citizenship multiplier optional / configurable.
- Add component tests with React Testing Library.
- Connect to a real API for hotels and meals.
- Better accessibility and i18n (multi-language UI).

---

