export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.client_name || !body.session_type || !body.start_time) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required booking fields (client_name, session_type, start_time)'
    })
  }

  const bookingId = `ENDURE-${Date.now().toString().slice(-4)}`
  const startTime = new Date(body.start_time)
  const duration = body.durationMinutes || 60
  const endTime = new Date(startTime.getTime() + duration * 60 * 1000)

  // iCal payload builder
  const formatIcs = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
  const icsString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EndureFitness//BookingEngine//EN',
    'BEGIN:VEVENT',
    `UID:${bookingId}@endurefitness.com`,
    `DTSTAMP:${formatIcs(new Date())}`,
    `DTSTART:${formatIcs(startTime)}`,
    `DTEND:${formatIcs(endTime)}`,
    `SUMMARY:EndureFitness ${body.session_type}`,
    `DESCRIPTION:1-on-1 session with Marcus Vance. Notice: 12-hour cancellation policy applies.`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  return {
    success: true,
    booking: {
      id: bookingId,
      client_name: body.client_name,
      session_type: body.session_type,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      status: 'confirmed',
      notes: body.notes || ''
    },
    icsContent: icsString,
    message: 'Booking created and confirmed successfully.'
  }
})
