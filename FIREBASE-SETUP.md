# McKay calendar setup

Project: `mckay-orchestras`. The website uses Firebase Authentication and Cloud Firestore. Website hosting can stay on GitHub Pages.

## Enable the services

1. In Firebase Console, open Build → Authentication → Get started. Enable Google under Sign-in method and select a support email.
2. Under Authentication → Settings → Authorized domains, add `makerofallthings.github.io` and `127.0.0.1` (and `localhost` if used locally).
3. Open Build → Firestore Database and create the default database in production mode. Choose a suitable region before creation.
4. In Firestore → Rules, paste the complete contents of `firestore.rules` and click Publish. These rules expose only published event documents and deny all other collections except an admin reading their own membership document.

## Grant the first administrator

1. Open `/admin/calendar/` on the local preview or deployed website and sign in with Google.
2. The access-required screen displays the account UID. It is also shown in Authentication → Users.
3. In Firestore → Data, create collection `admins` and a document whose ID is exactly that UID. Add a string field `label` identifying the administrator.
4. Reload the admin page. The admin can now create, edit, publish, unpublish, and delete events.

Only the Firebase project owner can create administrator membership documents through the console. The website cannot grant itself or others admin access. Removing the membership document revokes event editing at the rules layer.

## Verify

- Add a draft and confirm it does not appear on the public calendar.
- Publish it and confirm the calendar updates. Test signed out as well.
- Edit and delete a test event. Confirm an ordinary signed-in account cannot edit events.
- Event input uses the administrator's device time zone. Stored dates are UTC ISO strings; visitor dates display in Pacific time.

The repository contains the rule configuration but does not publish rules automatically with GitHub Pages. To deploy from an authenticated Firebase CLI, run `firebase deploy --only firestore:rules --project mckay-orchestras`.

## Reminders: not activated yet

## Website content administration

The footer lock beside the copyright opens an administrator sign-in modal without navigating away. Typing `2026` outside text fields opens the same modal. This shortcut only opens sign-in; Firebase approved-admin membership is still required. The old `/admin/` dashboard URL now returns to the homepage and opens sign-in. Calendar scheduling remains at `/admin/calendar/`.

Approved admins see one Edit control per logical block, including paragraphs, cards, the audio player, and individual statistics. Related text and link fields save together in a transaction. The student total and four existing ensembles' visibility update the totals automatically. Concurrent changes to the same edited field cause a conflict instead of overwriting another admin's work.

Publish the updated `firestore.rules` file to enable the `site/content` document. The calendar-only rules do not authorize website-content writes. Text is rendered as plain text, never HTML. Original uploaded PDFs are separate documents. Image URLs and public link destinations are editable; new ensemble routes, PDF replacement, file uploads, and 3D chair layouts still require code changes.

## Reminders: not activated yet
Reminder settings currently save a preview on the visitor's device. They do not register a subscription or send messages.

The production system still needs verified contact enrollment, consent, private subscription records, an unsubscribe/manage link, scheduled Cloud Functions, delivery jobs with duplicate protection, and email/SMS provider credentials held in server secrets. Event changes and cancellations must reschedule or cancel pending jobs. Repeat reminders stop at the event start. Time calculations must respect the subscriber's time zone and daylight saving changes. Never expose subscriptions or allow public writes to an email delivery queue.

Choose an email/SMS provider before implementing delivery. Admin edits and published calendar reads do not require a messaging provider.

