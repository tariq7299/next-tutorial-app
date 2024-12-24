## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.


## Some notes

**Database**
- I have replace the sql querying statemendt with connectPool variable that was made using pool from pg lib, as the the sql wasn't working correctly
- Also I have replaced the remote vercel postgres with a local postgres, as the remote one wasn't working correctly

**(routeName)**
    - If you put the file name in `()` it will group the route with all its loading.tsx and page.tsx...etc without affecting the actual route path in the url

**Note about suspense and loading skeletons**  
- Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.