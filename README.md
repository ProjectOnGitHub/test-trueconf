# Тестовое задание для TrueConf

## «Эмулятор лифта»

Приложение написано на VueJS 2. Сборка на собственном конфиге Webpack.

[Деплой на GH Pages](https://projectongithub.github.io/test-trueconf/)

Реализована основная часть задания (без расширенного задания):

[x] Количество этажей по умолчанию: 5  
[x] Количество шахт лифта по умолчанию: 1  
[x] По умолчанию лифт находится на 1 этаже в состоянии покоя (свободен)
[x] При нажатии на кнопку вызова лифт должен обработать этот вызов в соответствии со следующими сценариями:

1. Если вызов осуществляется с этажа, на котором лифта нет – свободный
   лифт начинает движение к выбранному этажу со скоростью 1 этаж в
   секунду.

- Достигнув нужного этажа лифт 3 секунды «отдыхает» - индикацию этого
  состояния можно реализовать с помощью мигания.
- После этого лифт снова переходит в состояние покоя и готов обработать
  следующий вызов.

2. Если в момент движения лифта осуществить вызов на другой этаж – этот вызов должен добавиться в очередь вызовов.
   Вызовы должны обрабатываться последовательно.
3. Вызов пропускается в случаях, если:

- лифт уже находится на выбранном этаже в состоянии покоя
- лифт уже находится в процессе обработки такого вызова (находится в
  движении к выбранному этажу)
- в очереди вызовов уже есть выбранный этаж

[x] Также необходимо реализовать дополнительную обвязку, состоящую из
следующих задач:

1. Добавить табло индикации на кабину лифта, на котором в процессе
   движения будет отображаться направление движения и целевой этаж.
2. Добавить индикацию кнопок вызова на этажах (например, смену цвета) в
   случае, если:

- лифт уже находится в процессе обработки такого вызова (находится в
  движении к выбранному этажу)
- в очереди вызовов уже есть выбранный этаж

3. Добавить сохранение состояния приложения (позиция лифта, очередь
   вызовов и т.д.) при перезагрузке страницы – после перезагрузки
   приложение должно возобновить работу с сохраненного состояния.

Установка

```console
   npm install
```

Запуск

```console
   npm run start
```
