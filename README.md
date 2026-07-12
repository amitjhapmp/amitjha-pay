# Personal Payroll Hub V5.2.1

Version 5.0 was rebuilt from scratch with separate modules.

Included

- Personalized employee profile
- Employee photo upload
- Automatic net payment calculation
- Automatic YTD totals
- Payroll entry, edit, delete, search, and year filter
- Dashboard charts
- Monthly and annual reports
- Advanced payroll analytics
- Pay calendar with recorded and expected paydays
- PDF pay stub vault
- Browser notification preferences
- Full backup with payroll, profile, settings, and PDFs
- Lightweight payroll backup
- Light, dark, and system themes
- Responsive mobile and desktop layout
- Installable PWA
- Offline support
- Automatic update detection
- GitHub Pages ready

GitHub deployment

1. Extract the ZIP.
2. Replace every file in your local `payroll-tracker` repository.
3. Commit with `Rebuild app as Version 5.0`.
4. Push origin.
5. Wait about one minute.
6. Open the site and use Ctrl + Shift + R once.

Notification limitation

GitHub Pages cannot provide server-side push notifications while the app is completely closed. Reminders are evaluated while the app is open or active.


Version 5.1 changes

- Added Pay Period Start to Payroll Entry
- Added Pay Period End to Payroll Entry
- Pay period dates auto-fill from Pay Date
- Pay period dates remain editable before saving
- Existing records are migrated automatically
- Payroll table and CSV exports use saved pay period dates


Version 5.2 changes

- Sidebar company name syncs with Profile & Settings
- Sidebar employee name syncs with Profile & Settings
- Sidebar logo initial updates from the company name
- Browser tab title updates from the employee name
- Branding updates immediately after saving the profile


Version 5.2.1 cacheproof fix

- Renamed CSS and main JavaScript files to bypass old browser and service-worker caches
- Default sidebar labels are now generic until the saved profile loads
- Sidebar branding is re-applied after startup
- Browser tab displays v5.2.1 for easy verification
