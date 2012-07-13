# rav-timeliner

Summary: Using the basic Ravelry json project feed, build a simple timeline showing project starts and completions

I wanted to play around with a timeline of projects, as users have requested in [issue #1158](http://www.ravelry.com/issues/1158), mashed up with Facebook's "timeline" presentation of user events. For now, it only pulls in finished projects. It uses javascript to parse the json feed, build a list of "created" and "finished" events, then display them in order, styled like a timeline.

This is still simple enough to be done completely on the client side, but a more robust version should probably be handled server-side or at least use the full API. Commenters on the List issue, however, seem to be looking for a rather simple illustration of how their projects overlap in time, and this simple implementation largely fulfills that request. 

## Current features

* Displays "start" and "finish" events for all finished projects, in reverse chronological order, each with a link back to the project page.
* "Start" events include the pattern name, yarn used and intended recipient.
* "End" events include the name of the finished project and a photo.
* Start events are on the left, end events on the right to visually distinguish patterns of cast-on-itis, etc.

## Ideas for future improvements

* Testing against many more users' data. Differences in how they fill out certain fields will require more careful handling of that data.
* Don't load all events at once, instead load older events as you scroll. This is potentially tricky because end dates for newly loaded (older) projects may overlap with start dates for events previously loaded. Adding date parameters to API requests should solve this, though.
* More nuanced crunching of the event timestamps to space events more "accurately" along the timeline. The order is correct (except for events on the same date, which can't really be helped), but gaps in activity aren't represented. Whether that's necessary is open to debate.
* Hide-able list of projects that need metadata filled in (e.g., "Color Affection is complete, but missing a finished date") to help users complete their timelines.
* Inclusion of non-finished projects. Do users usually fill in a completed date to show when they frogged a project? Where would a hibernating project appear (date last updated?)?
* Do users need more information directly on the timeline? Could more info be exposed when you hover over an event?
* Some sort of "zoom out" view that shows aggregated information (e.g., "2011: 20 projects started, 16 projects finished | 2010: 14 projects started, 10 projects finished") that can be clicked to expand to a detailed view.
* Similar timeline for stash, illustrating stash accumulation/reduction
* Clicking a button on a start/end event could scroll the window to the corresponding end/start event.
