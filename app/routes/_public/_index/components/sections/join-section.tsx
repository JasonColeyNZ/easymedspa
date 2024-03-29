import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/ui/button.tsx";

// import { Button } from "../Button.tsx";
import { ContentContainer } from "../ContentContainer.tsx";
import { SectionTitle } from "~/components/typography/section-title.tsx";
import { Input } from "~/components/ui/input.tsx";
import type { action } from "../../route.tsx";

export function JoinSection() {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (fetcher.data?.success === false) {
      inputRef.current?.focus();
      setError(fetcher.data.message);
    } else if (fetcher.data?.success === true && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [fetcher.data]);

  const showError = error && !fetcher.data?.submission;

  return (
    <section className="mt-[7.65rem] bg-primary-400 xl:mt-[9.35rem]">
      <ContentContainer className="px-8 pt-[4.45rem] pb-[3.8rem] sm:px-24 md:px-24 md:pt-[4.25rem] md:pb-[4.5rem]">
        <p className="text-center text-[0.8rem] font-medium uppercase tracking-[0.33em] text-white md:tracking-[0.4em]">
          35.000+ already joined
        </p>
        <SectionTitle className="mt-[0.55rem] leading-tight !text-white md:mx-auto md:mt-[2.1rem] md:w-[450px]">
          Stay up-to-date with what we're doing
        </SectionTitle>
        <fetcher.Form
          // replace
          method="post"
          //mailchimp action
          action="https://easymedspa.us13.list-manage.com/subscribe/post?u=41bc6693b55cc23a86997acc7&amp;id=f84eeaee65&amp;f_id=00ecf3e4f0"
          // action="actions/subscribe"
          className="mt-[1.8rem] flex flex-col md:mx-auto md:mt-[2.25rem] md:w-[440px] md:flex-row md:gap-4"
        >
          <div className={"rounded md:flex-1"}>
            <div className="relative">
              <Input
                ref={inputRef}
                //mailchimp input name
                name="EMAIL"
                placeholder="Enter your email address"
                onChange={() => setError(null)}
                className={clsx(
                  "peer w-full py-[0.75rem] px-4 pr-10 text-sm tracking-wide outline-none",
                  {
                    "rounded border-2 border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-neutral-800":
                      !showError,
                    "rounded-t border-2 border-secondary-400": showError,
                  },
                )}
                aria-label="Enter your email address"
                aria-describedby={error ? "email-error" : undefined}
              />
              {showError && (
                <>
                  <img
                    src="/images/icon-error.svg"
                    alt=""
                    className="absolute right-3 top-1/2 w-5 -translate-y-1/2"
                  />
                  <p
                    id="email-error"
                    className="absolute top-[calc(100%-2px)] left-0 right-0 whitespace-nowrap rounded-b bg-secondary-400 px-4 py-1 text-xs italic text-white"
                  >
                    {error}
                  </p>
                </>
              )}
            </div>
          </div>
          <Button
            // as="button"
            type="submit"
            variant={"secondary"}
            // appearance=""
            disabled={Boolean(fetcher.data?.submission)}
            className={clsx(
              "mt-[1rem] px-4 md:col-span-3 md:mt-0 md:px-[1.325rem]",
              { "!mt-10 md:!mt-0": error },
            )}
          >
            Contact Us
          </Button>
        </fetcher.Form>
      </ContentContainer>
    </section>
  );
}
