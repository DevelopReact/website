import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const contactData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      companyName: formData.get('companyName') as string,
      workEmail: formData.get('workEmail') as string,
      message: formData.get('message') as string,
      agreeToPrivacyPolicy: formData.get('agreeToPrivacyPolicy') === 'true',
      files: formData.getAll('files') as File[],
    };

    // Валидация
    const errors: string[] = [];

    if (!contactData.firstName?.trim()) errors.push('First name is required');
    if (!contactData.lastName?.trim()) errors.push('Last name is required');
    if (!contactData.workEmail?.trim()) errors.push('Work email is required');
    if (!contactData.agreeToPrivacyPolicy) errors.push('Privacy policy agreement is required');

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactData.workEmail && !emailRegex.test(contactData.workEmail)) {
      errors.push('Invalid email format');
    }

    // Валидация файлов
    const allowedTypes = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (contactData.files.length > 3) {
      errors.push('Maximum 3 files allowed');
    }

    for (const file of contactData.files) {
      if (file.size > maxFileSize) {
        errors.push(`File ${file.name} exceeds 5MB limit`);
      }

      if (!allowedTypes.includes(file.type)) {
        errors.push(`File ${file.name} has invalid type`);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({error: 'Validation failed', details: errors}, {status: 400});
    }

    // Здесь бы была отправка email или сохранение в базу данных
    // TODO: Implement email sending or database storage

    // Симуляция обработки
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({success: true, message: 'Form submitted successfully'});
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}
