export default function CaseStudies() {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl md:text-4xl font-semibold'>Join Us And Be Part Of Our Life!</h1>
      <p className='text-blue-100/80'>We work completely remotely around the world.</p>
      <form
        className='card grid gap-3'
        action='/api/careers'
        method='post'
        encType='multipart/form-data'
      >
        <input name='name' placeholder='Name' className='w-full px-3 py-2 rounded bg-white/10' />
        <input name='email' placeholder='Email' className='w-full px-3 py-2 rounded bg-white/10' />
        <input
          name='experience'
          placeholder='Experience'
          className='w-full px-3 py-2 rounded bg-white/10'
        />
        <input
          name='field'
          placeholder='Field of expertise'
          className='w-full px-3 py-2 rounded bg-white/10'
        />
        <textarea
          name='coverLetter'
          placeholder='Cover letter'
          className='w-full px-3 py-2 rounded bg-white/10 min-h-[120px]'
        />
        <input type='file' name='attachment' />
        <button type='submit' className='underline'>
          send
        </button>
      </form>
    </div>
  );
}
