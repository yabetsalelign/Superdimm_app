import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

OUT_DIR = r"c:\Users\Ruth.A\Desktop\New folder\Superdimm_app\internship_forms"
os.makedirs(OUT_DIR, exist_ok=True)

styles = getSampleStyleSheet()

# Custom styles
header_title_style = ParagraphStyle(
    'HeaderTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    alignment=1, # Center
    textColor=colors.HexColor("#111827")
)

header_sub_style = ParagraphStyle(
    'HeaderSub',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    alignment=1,
    textColor=colors.HexColor("#374151")
)

doc_title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    alignment=1,
    textColor=colors.HexColor("#000000")
)

cell_style = ParagraphStyle(
    'TableCell',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.5,
    leading=9.5,
    textColor=colors.HexColor("#1F2937")
)

cell_bold = ParagraphStyle(
    'TableCellBold',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=7.5,
    leading=9.5,
    textColor=colors.HexColor("#111827")
)

cell_center = ParagraphStyle(
    'TableCellCenter',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.5,
    leading=9.5,
    alignment=1,
    textColor=colors.HexColor("#1F2937")
)

cell_center_bold = ParagraphStyle(
    'TableCellCenterBold',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=7.5,
    leading=9.5,
    alignment=1,
    textColor=colors.HexColor("#111827")
)

meta_label = ParagraphStyle(
    'MetaLabel',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=11,
    textColor=colors.HexColor("#111827")
)

meta_val = ParagraphStyle(
    'MetaVal',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    textColor=colors.HexColor("#1F2937")
)

section_heading = ParagraphStyle(
    'SecHead',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12,
    textColor=colors.HexColor("#111827")
)

# ---------------------------------------------------------------------------------
# 1. GENERATE FORM 02: VPAA/DPT/OF/002 - Internship Student Logbook Form
# ---------------------------------------------------------------------------------
def generate_form_02():
    pdf_path = os.path.join(OUT_DIR, "VPAA_DPT_OF_002_Internship_Student_Logbook.pdf")
    # Margin: 0.4 in to fit tables cleanly
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=28,
        rightMargin=28,
        topMargin=26,
        bottomMargin=26
    )

    story = []

    # 13 weeks data
    weeks_data = [
        # MONTH 1 (WEEKS 1-4)
        {
            "week": "Week 1",
            "period": "July 1 – July 6, 2026",
            "days": [
                ("Day 1", "July 1, 2026", "Completed workplace registration and attended SuperDimm project briefing."),
                ("Day 2", "July 2, 2026", "Reviewed project architecture documentation and development guidelines."),
                ("Day 3", "July 3, 2026", "Configured development environment: Node.js, VS Code, Git, and Android SDK."),
                ("Day 4", "July 4, 2026", "Analyzed customer care ticketing requirements and complaint categories."),
                ("Day 5", "July 6, 2026", "Documented backend functional requirements and initial data entity scope."),
            ]
        },
        {
            "week": "Week 2",
            "period": "July 7 – July 11, 2026",
            "days": [
                ("Day 1", "July 7, 2026", "Analyzed customer self-service reporting vs. staff ticket management needs."),
                ("Day 2", "July 8, 2026", "Formulated modular architecture: Next.js web, mobile client, and REST APIs."),
                ("Day 3", "July 9, 2026", "Designed data schemas for Customer, ServiceRequest, and Category models."),
                ("Day 4", "July 10, 2026", "Specified RESTful API contract: endpoints, request/response formats, and codes."),
                ("Day 5", "July 11, 2026", "Finalized architectural workflow diagrams for request submission and tracking."),
            ]
        },
        {
            "week": "Week 3",
            "period": "July 13 – July 17, 2026",
            "days": [
                ("Day 1", "July 13, 2026", "Initialized SuperDimm web app using Next.js App Router and TypeScript."),
                ("Day 2", "July 14, 2026", "Configured Tailwind CSS tokens, typography, and responsive breakpoints."),
                ("Day 3", "July 15, 2026", "Set up shadcn/ui and Radix UI components (Button, Card, Dialog, Badge)."),
                ("Day 4", "July 16, 2026", "Built shared application layout: header, sidebar, and container wrappers."),
                ("Day 5", "July 17, 2026", "Implemented wireframes and placeholder views for staff dashboard and portal."),
            ]
        },
        {
            "week": "Week 4",
            "period": "July 20 – July 24, 2026",
            "days": [
                ("Day 1", "July 20, 2026", "Configured Prisma ORM with SQLite database for local development."),
                ("Day 2", "July 21, 2026", "Resolved database driver issues using @prisma/adapter-better-sqlite3."),
                ("Day 3", "July 22, 2026", "Executed Prisma migrations for Customer and ServiceRequest relational models."),
                ("Day 4", "July 23, 2026", "Implemented core REST API endpoints: ticket submission and filtered listing."),
                ("Day 5", "July 24, 2026", "Developed customer profile API endpoints; verified JSON payloads with Postman."),
            ]
        },
        # MONTH 2 (WEEKS 5-8)
        {
            "week": "Week 5",
            "period": "July 27 – July 31, 2026",
            "days": [
                ("Day 1", "July 27, 2026", "Designed internal operations dashboard layout for real-time ticket oversight."),
                ("Day 2", "July 28, 2026", "Built statistical metric cards for Total, Pending, In-Progress, and Resolved."),
                ("Day 3", "July 29, 2026", "Created aggregation queries calculating ticket volumes across categories."),
                ("Day 4", "July 30, 2026", "Implemented priority badges (Low, Medium, High, Critical) for ticket triage."),
                ("Day 5", "July 31, 2026", "Tested dashboard query efficiency and verified multi-screen responsiveness."),
            ]
        },
        {
            "week": "Week 6",
            "period": "August 3 – August 7, 2026",
            "days": [
                ("Day 1", "August 3, 2026", "Developed customer directory table displaying account numbers and contacts."),
                ("Day 2", "August 4, 2026", "Built debounced search filter for rapid customer lookup by phone/account ID."),
                ("Day 3", "August 5, 2026", "Implemented slide-over drawer (Sheet) for inspecting customer profiles."),
                ("Day 4", "August 6, 2026", "Implemented table pagination and sorting controls for large customer datasets."),
                ("Day 5", "August 7, 2026", "Tested customer directory UI states, loading skeletons, and empty states."),
            ]
        },
        {
            "week": "Week 7",
            "period": "August 10 – August 14, 2026",
            "days": [
                ("Day 1", "August 10, 2026", "Built ticket detail view (/requests/[id]) showing problem details and timestamps."),
                ("Day 2", "August 11, 2026", "Implemented ticket lifecycle transition workflow: Pending -> In Progress -> Resolved."),
                ("Day 3", "August 12, 2026", "Integrated staff resolution notes and technician assignment dropdown menus."),
                ("Day 4", "August 13, 2026", "Added optimistic UI updates for status changes with rollback on API errors."),
                ("Day 5", "August 14, 2026", "Validated end-to-end request lifecycle and database persistence upon updates."),
            ]
        },
        {
            "week": "Week 8",
            "period": "August 17 – August 21, 2026",
            "days": [
                ("Day 1", "August 17, 2026", "Configured NextAuth authentication with credentials and JWT session strategy."),
                ("Day 2", "August 18, 2026", "Implemented Role-Based Access Control (RBAC) separating customer and staff views."),
                ("Day 3", "August 19, 2026", "Created Next.js route middleware guarding internal staff dashboard routes."),
                ("Day 4", "August 20, 2026", "Secured API routes by verifying JWT bearer tokens in authorization headers."),
                ("Day 5", "August 21, 2026", "Tested route protection, session expiry, and demonstrated secure web platform."),
            ]
        },
        # MONTH 3 (WEEKS 9-13)
        {
            "week": "Week 9",
            "period": "August 24 – August 28, 2026",
            "days": [
                ("Day 1", "August 24, 2026", "Built customer self-service landing portal and public service overview pages."),
                ("Day 2", "August 25, 2026", "Built problem-reporting form with category pickers (Broadband, SIM, Billing)."),
                ("Day 3", "August 26, 2026", "Implemented automatic unique tracking reference generator (e.g. REQ-2026-XXXX)."),
                ("Day 4", "August 27, 2026", "Developed public ticket status lookup page for tracking ticket progress."),
                ("Day 5", "August 28, 2026", "Added client-side form validation with Zod to prevent invalid submissions."),
            ]
        },
        {
            "week": "Week 10",
            "period": "August 31 – September 4, 2026",
            "days": [
                ("Day 1", "August 31, 2026", "Conducted HCI audit of web interfaces to reduce visual complexity and clutter."),
                ("Day 2", "September 1, 2026", "Simplified dense tables by moving secondary metadata into slide-over panels."),
                ("Day 3", "September 2, 2026", "Replaced raw status text with high-contrast, accessible status badges."),
                ("Day 4", "September 3, 2026", "Designed intuitive empty-state views with icons and actionable prompts."),
                ("Day 5", "September 4, 2026", "Standardized toast notifications, loading states, and form feedback dialogs."),
            ]
        },
        {
            "week": "Week 11",
            "period": "September 7 – September 11, 2026",
            "days": [
                ("Day 1", "September 7, 2026", "Refined responsive web layouts across varying monitor and laptop resolutions."),
                ("Day 2", "September 8, 2026", "Planned cross-platform mobile client architecture using React Native & Expo."),
                ("Day 3", "September 9, 2026", "Initialized mobile project with Expo Router and TypeScript configuration."),
                ("Day 4", "September 10, 2026", "Configured mobile theme tokens (Colors, Typography, Spacing) and base UI."),
                ("Day 5", "September 11, 2026", "Built bottom tab navigation layout: Home, Services, Requests, Alerts, Profile."),
            ]
        },
        {
            "week": "Week 12",
            "period": "September 14 – September 18, 2026",
            "days": [
                ("Day 1", "September 14, 2026", "Implemented mobile login view with JWT session storage via Expo SecureStore."),
                ("Day 2", "September 15, 2026", "Developed mobile Home and telecom services catalog showcase screens."),
                ("Day 3", "September 16, 2026", "Built mobile service request creation screen with category dropdown picker."),
                ("Day 4", "September 17, 2026", "Developed mobile customer ticket history screen with status badges."),
                ("Day 5", "September 18, 2026", "Implemented ticket detail screen, profile view, and alerts placeholder screen."),
            ]
        },
        {
            "week": "Week 13",
            "period": "September 21 – September 25, 2026",
            "days": [
                ("Day 1", "September 21, 2026", "Tested mobile application on Android emulators, resolving viewport bugs."),
                ("Day 2", "September 22, 2026", "Conducted cross-platform integration tests between mobile client and web APIs."),
                ("Day 3", "September 23, 2026", "Documented system limitations (mobile notifications marked as prototype)."),
                ("Day 4", "September 24, 2026", "Cleaned codebase, checked TypeScript compile errors, and pushed to GitHub."),
                ("Day 5", "September 25, 2026", "Gathered screenshots, verified technical data, and finalized report logbook."),
            ]
        }
    ]

    # Render each 4-week report as its own section/page
    reports = [
        ("REPORT 1 (WEEKS 1 – 4)", weeks_data[0:4], True),
        ("REPORT 2 (WEEKS 5 – 8)", weeks_data[4:8], False),
        ("REPORT 3 (WEEKS 9 – 13)", weeks_data[8:13], False)
    ]

    for rep_idx, (rep_title, rep_weeks, is_first) in enumerate(reports):
        if rep_idx > 0:
            story.append(PageBreak())

        # Header Table
        header_data = [
            [
                Paragraph("<b>ADDIS ABABA SCIENCE AND TECHNOLOGY UNIVERSITY</b><br/>COLLEGE OF ENGINEERING<br/>DEPARTMENT OF SOFTWARE ENGINEERING", header_title_style),
                Paragraph("<b>Document No.:</b> VPAA/DPT/OF/002<br/><b>Issue No.:</b> 1<br/><b>Page:</b> 1 of 1", header_sub_style)
            ]
        ]
        t_header = Table(header_data, colWidths=[380, 150])
        t_header.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_header)
        story.append(Spacer(1, 6))

        # Title
        story.append(Paragraph("<b>INTERNSHIP STUDENT LOGBOOK FORM</b> — " + rep_title, doc_title_style))
        story.append(Spacer(1, 6))

        # Student & Organization Metadata Table
        meta_table_data = [
            [Paragraph("Student's Name:", meta_label), Paragraph("Yabets Alelign Tiruneh", meta_val),
             Paragraph("Student ID:", meta_label), Paragraph("ETS 1352/15", meta_val)],
            [Paragraph("Name of Company:", meta_label), Paragraph("Ethio Telecom (CTO Silicon / Bole Branch)", meta_val),
             Paragraph("Department:", meta_label), Paragraph("Software Engineering", meta_val)],
            [Paragraph("Name of Supervisor:", meta_label), Paragraph("Mr. Naod (Director)", meta_val),
             Paragraph("Project / Role:", meta_label), Paragraph("SuperDimm / Software Dev Intern", meta_val)]
        ]
        t_meta = Table(meta_table_data, colWidths=[105, 175, 80, 170])
        t_meta.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOX', (0,0), (-1,-1), 0.5, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.lightgrey),
            ('TOPPADDING', (0,0), (-1,-1), 2.5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
            ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#F3F4F6")),
            ('BACKGROUND', (2,0), (2,-1), colors.HexColor("#F3F4F6")),
        ]))
        story.append(t_meta)
        story.append(Spacer(1, 5))

        # Safety prompt on Report 1 only
        if is_first:
            safety_data = [
                [Paragraph("<b>Have you been given brief on the company safety guidelines?</b> [ X ] Yes &nbsp;&nbsp;&nbsp;&nbsp; [ &nbsp; ] No<br/><i>(This question will be raised only on report 1. Please delete in report 2, 3 and 4)</i>", cell_style)]
            ]
            t_safety = Table(safety_data, colWidths=[530])
            t_safety.setStyle(TableStyle([
                ('BOX', (0,0), (-1,-1), 0.5, colors.black),
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
                ('TOPPADDING', (0,0), (-1,-1), 3),
                ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ]))
            story.append(t_safety)
            story.append(Spacer(1, 5))

        # Weekly Activity Table
        table_rows = [
            [
                Paragraph("<b>Week</b>", cell_center_bold),
                Paragraph("<b>Day</b>", cell_center_bold),
                Paragraph("<b>Date</b>", cell_center_bold),
                Paragraph("<b>Work Performed</b>", cell_center_bold),
                Paragraph("<b>Supervisor's Signature & Comment</b>", cell_center_bold)
            ]
        ]

        for w in rep_weeks:
            w_name = w["week"]
            days = w["days"]
            num_days = len(days)
            for idx, (d_name, d_date, d_desc) in enumerate(days):
                if idx == 0:
                    w_cell = Paragraph(f"<b>{w_name}</b>", cell_center_bold)
                    # Supervisor cell spanning the week or at bottom
                    s_cell = Paragraph("<b>Comment:</b><br/><br/><b>Sign:</b> ________ <b>Date:</b> ____", cell_style)
                else:
                    w_cell = ""
                    s_cell = ""

                table_rows.append([
                    w_cell,
                    Paragraph(d_name, cell_center),
                    Paragraph(d_date, cell_center),
                    Paragraph(d_desc, cell_style),
                    s_cell
                ])

        t_log = Table(table_rows, colWidths=[45, 38, 72, 235, 140])
        
        # Build TableStyle with spans
        t_style = [
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E5E7EB")),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 2),
            ('BOTTOMPADDING', (0,0), (-1,-1), 2),
            ('LEFTPADDING', (0,0), (-1,-1), 3),
            ('RIGHTPADDING', (0,0), (-1,-1), 3),
        ]

        # Add spans for week and supervisor comment columns
        cur_row = 1
        for w in rep_weeks:
            n = len(w["days"])
            t_style.append(('SPAN', (0, cur_row), (0, cur_row + n - 1)))
            t_style.append(('SPAN', (4, cur_row), (4, cur_row + n - 1)))
            t_style.append(('VALIGN', (0, cur_row), (0, cur_row + n - 1), 'MIDDLE'))
            t_style.append(('VALIGN', (4, cur_row), (4, cur_row + n - 1), 'TOP'))
            t_style.append(('BACKGROUND', (0, cur_row), (0, cur_row + n - 1), colors.HexColor("#F9FAFB")))
            cur_row += n

        t_log.setStyle(TableStyle(t_style))
        story.append(t_log)

    doc.build(story)
    print("Generated:", pdf_path)


# ---------------------------------------------------------------------------------
# 2. GENERATE FORM 06: VPAA/DPT/OF/006 - Monthly Evaluation Format
# ---------------------------------------------------------------------------------
def generate_form_06():
    pdf_path = os.path.join(OUT_DIR, "VPAA_DPT_OF_006_Monthly_Performance_Evaluation.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=30,
        rightMargin=30,
        topMargin=26,
        bottomMargin=26
    )

    story = []

    months = ["Month 1 (July 2026)", "Month 2 (August 2026)", "Month 3 (September 2026)"]

    for m_idx, month_label in enumerate(months):
        if m_idx > 0:
            story.append(PageBreak())

        # Page 1 of this month
        header_data = [
            [
                Paragraph("<b>ADDIS ABABA SCIENCE AND TECHNOLOGY UNIVERSITY</b><br/>COLLEGE OF ENGINEERING<br/>DEPARTMENT OF SOFTWARE ENGINEERING", header_title_style),
                Paragraph("<b>Document No.:</b> VPAA/DPT/OF/006<br/><b>Issue No.:</b> 1<br/><b>Page:</b> Page 1 of 2", header_sub_style)
            ]
        ]
        t_header = Table(header_data, colWidths=[370, 160])
        t_header.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_header)
        story.append(Spacer(1, 6))

        story.append(Paragraph("<b>INTERNSHIP INDUSTRY SUPERVISOR MONTHLY PERFORMANCE EVALUATION FORMAT</b>", doc_title_style))
        story.append(Spacer(1, 6))

        # Metadata
        meta_table_data = [
            [Paragraph("Month:", meta_label), Paragraph(f"<b>{month_label}</b>", meta_val),
             Paragraph("Company Name:", meta_label), Paragraph("Ethio Telecom (CTO Silicon / Bole Branch)", meta_val)],
            [Paragraph("Company Supervisor's Name:", meta_label), Paragraph("Mr. Naod (Director)", meta_val),
             Paragraph("Phone No.:", meta_label), Paragraph("____________________________", meta_val)],
            [Paragraph("Student's Full Name:", meta_label), Paragraph("Yabets Alelign Tiruneh", meta_val),
             Paragraph("Department:", meta_label), Paragraph("Software Engineering", meta_val)],
            [Paragraph("ID No.:", meta_label), Paragraph("ETS 1352/15", meta_val),
             Paragraph("Project / Role:", meta_label), Paragraph("SuperDimm / Software Dev Intern", meta_val)]
        ]
        t_meta = Table(meta_table_data, colWidths=[120, 160, 95, 155])
        t_meta.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOX', (0,0), (-1,-1), 0.5, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.lightgrey),
            ('TOPPADDING', (0,0), (-1,-1), 2.5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
            ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#F3F4F6")),
            ('BACKGROUND', (2,0), (2,-1), colors.HexColor("#F3F4F6")),
        ]))
        story.append(t_meta)
        story.append(Spacer(1, 8))

        story.append(Paragraph("<i>Please give the appropriate value in the box provided out of the total value given for each evaluation criteria:</i>", cell_style))
        story.append(Spacer(1, 6))

        # General Performance Table
        gp_data = [
            [Paragraph("<b>General Performance (25%)</b>", cell_bold), Paragraph("<b>Max Value</b>", cell_center_bold), Paragraph("<b>Awarded Mark</b>", cell_center_bold)],
            [Paragraph("Punctuality", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Reliability", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Independence In Work", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Communication Skills", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Professionalism", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("<b>Subtotal (General Performance)</b>", cell_bold), Paragraph("<b>25%</b>", cell_center_bold), Paragraph("", cell_center_bold)]
        ]
        t_gp = Table(gp_data, colWidths=[350, 80, 100])
        t_gp.setStyle(TableStyle([
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E5E7EB")),
            ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#F9FAFB")),
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ]))
        story.append(t_gp)
        story.append(Spacer(1, 8))

        # Personal Skill Table
        ps_data = [
            [Paragraph("<b>Personal Skill (25%)</b>", cell_bold), Paragraph("<b>Max Value</b>", cell_center_bold), Paragraph("<b>Awarded Mark</b>", cell_center_bold)],
            [Paragraph("Speed of Work", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Accuracy", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Engagement", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Do you need him for your work", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Cooperation with colleagues", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("<b>Subtotal (Personal Skill)</b>", cell_bold), Paragraph("<b>25%</b>", cell_center_bold), Paragraph("", cell_center_bold)]
        ]
        t_ps = Table(ps_data, colWidths=[350, 80, 100])
        t_ps.setStyle(TableStyle([
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E5E7EB")),
            ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#F9FAFB")),
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ]))
        story.append(t_ps)

        # Page 2 of this month
        story.append(PageBreak())

        header_data_p2 = [
            [
                Paragraph("<b>ADDIS ABABA SCIENCE AND TECHNOLOGY UNIVERSITY</b><br/>COLLEGE OF ENGINEERING<br/>DEPARTMENT OF SOFTWARE ENGINEERING", header_title_style),
                Paragraph(f"<b>Document No.:</b> VPAA/DPT/OF/006<br/><b>{month_label}</b><br/><b>Page:</b> Page 2 of 2", header_sub_style)
            ]
        ]
        t_header_p2 = Table(header_data_p2, colWidths=[370, 160])
        t_header_p2.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_header_p2)
        story.append(Spacer(1, 10))

        story.append(Paragraph("<b>INTERNSHIP INDUSTRY SUPERVISOR MONTHLY PERFORMANCE EVALUATION (CONTD.)</b>", doc_title_style))
        story.append(Spacer(1, 10))

        # Professional Skills Table
        pro_data = [
            [Paragraph("<b>Professional Skills (50%)</b>", cell_bold), Paragraph("<b>Max Value</b>", cell_center_bold), Paragraph("<b>Awarded Mark</b>", cell_center_bold)],
            [Paragraph("Technical Skills", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Organizational Skills", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Support of the project tasks", cell_style), Paragraph("5%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Responsibility in the task fulfillment", cell_style), Paragraph("15%", cell_center), Paragraph("", cell_center)],
            [Paragraph("Quality as a team member", cell_style), Paragraph("20%", cell_center), Paragraph("", cell_center)],
            [Paragraph("<b>Subtotal (Professional Skills)</b>", cell_bold), Paragraph("<b>50%</b>", cell_center_bold), Paragraph("", cell_center_bold)],
            [Paragraph("<b>Total Marks (100%)</b>", cell_bold), Paragraph("<b>100%</b>", cell_center_bold), Paragraph("", cell_center_bold)],
            [Paragraph("<b>Monthly Performance Mark (Total Marks / 100 * 20)</b>", cell_bold), Paragraph("<b>20</b>", cell_center_bold), Paragraph("", cell_center_bold)]
        ]
        t_pro = Table(pro_data, colWidths=[350, 80, 100])
        t_pro.setStyle(TableStyle([
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E5E7EB")),
            ('BACKGROUND', (0,-2), (-1,-1), colors.HexColor("#EFF6FF")),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_pro)
        story.append(Spacer(1, 14))

        # Comment & Signature block
        comm_data = [
            [Paragraph("<b>Additional Comment:</b><br/><br/><br/><br/>", cell_style)],
            [Paragraph("<b>Company Supervisor Name:</b> Mr. Naod (Director)<br/><b>Signature:</b> ____________________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Date:</b> ______________________<br/><b>Company Stamp:</b>", cell_style)]
        ]
        t_comm = Table(comm_data, colWidths=[530])
        t_comm.setStyle(TableStyle([
            ('BOX', (0,0), (-1,-1), 1, colors.black),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t_comm)

    doc.build(story)
    print("Generated:", pdf_path)


# ---------------------------------------------------------------------------------
# 3. GENERATE FORM 04: VPAA/DPT/OF/004 - Overall Evaluation Form
# ---------------------------------------------------------------------------------
def generate_form_04():
    pdf_path = os.path.join(OUT_DIR, "VPAA_DPT_OF_004_Industry_Supervisor_Overall_Evaluation.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=30,
        rightMargin=30,
        topMargin=26,
        bottomMargin=26
    )

    story = []

    # PAGE 1: Section A
    header_data_p1 = [
        [
            Paragraph("<b>ADDIS ABABA SCIENCE AND TECHNOLOGY UNIVERSITY</b><br/>COLLEGE OF ENGINEERING<br/>DEPARTMENT OF SOFTWARE ENGINEERING", header_title_style),
            Paragraph("<b>Document No.:</b> VPAA/DPT/OF/004<br/><b>Issue No.:</b> 1<br/><b>Page:</b> Page 1 of 3", header_sub_style)
        ]
    ]
    t_header_p1 = Table(header_data_p1, colWidths=[370, 160])
    t_header_p1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_header_p1)
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>INTERNSHIP INDUSTRY SUPERVISOR OVERALL EVALUATION FORM</b>", doc_title_style))
    story.append(Spacer(1, 6))

    meta_data = [
        [Paragraph("Student's Name:", meta_label), Paragraph("Yabets Alelign Tiruneh", meta_val),
         Paragraph("ID No.:", meta_label), Paragraph("ETS 1352/15", meta_val)],
        [Paragraph("Department:", meta_label), Paragraph("Software Engineering", meta_val),
         Paragraph("Organization's Name:", meta_label), Paragraph("Ethio Telecom (CTO Silicon / Bole Branch)", meta_val)],
        [Paragraph("Duration of Internship:", meta_label), Paragraph("July 1, 2026 – September 30, 2026 (3 Months)", meta_val),
         Paragraph("Project / Role:", meta_label), Paragraph("SuperDimm / Software Dev Intern", meta_val)]
    ]
    t_meta = Table(meta_data, colWidths=[120, 160, 100, 150])
    t_meta.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 0.5, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.lightgrey),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#F3F4F6")),
        ('BACKGROUND', (2,0), (2,-1), colors.HexColor("#F3F4F6")),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Student's Performance Evaluation</b>", section_heading))
    story.append(Paragraph("<i>Instruction: Supervisor is kindly requested to fill up (/) the box indicated on each item in section A and B as guideline shown below:<br/><b>1 = Not Satisfied &nbsp;&nbsp;|&nbsp;&nbsp; 2 = Less Satisfied &nbsp;&nbsp;|&nbsp;&nbsp; 3 = Satisfied &nbsp;&nbsp;|&nbsp;&nbsp; 4 = Good &nbsp;&nbsp;|&nbsp;&nbsp; 5 = Very Good</b></i>", cell_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>Section A (Job Performance)</b>", cell_bold))
    story.append(Spacer(1, 4))

    sec_a_data = [
        [Paragraph("<b>No.</b>", cell_center_bold), Paragraph("<b>Item & Description</b>", cell_bold),
         Paragraph("<b>1</b>", cell_center_bold), Paragraph("<b>2</b>", cell_center_bold),
         Paragraph("<b>3</b>", cell_center_bold), Paragraph("<b>4</b>", cell_center_bold), Paragraph("<b>5</b>", cell_center_bold)],
        [Paragraph("1", cell_center), Paragraph("<b>Knowledge about the task assigned:</b> In-depth knowledge about area of work.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("2", cell_center), Paragraph("<b>Problem Solving:</b> Quality of job and problem-solving skills.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("3", cell_center), Paragraph("<b>Quality of job performed:</b> Precision and efficiency.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("4", cell_center), Paragraph("<b>Punctuality in production:</b> Ability to carry out job within the specified time frame.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("5", cell_center), Paragraph("<b>Initiative:</b> Ability to act independently in accomplishing the tasks assigned and solving problems.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
    ]
    t_sec_a = Table(sec_a_data, colWidths=[25, 335, 34, 34, 34, 34, 34])
    t_sec_a.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E5E7EB")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_sec_a)

    # PAGE 2: Section B & C
    story.append(PageBreak())

    header_data_p2 = [
        [
            Paragraph("<b>ADDIS ABABA SCIENCE AND TECHNOLOGY UNIVERSITY</b><br/>COLLEGE OF ENGINEERING<br/>DEPARTMENT OF SOFTWARE ENGINEERING", header_title_style),
            Paragraph("<b>Document No.:</b> VPAA/DPT/OF/004<br/><b>Issue No.:</b> 1<br/><b>Page:</b> Page 2 of 3", header_sub_style)
        ]
    ]
    t_header_p2 = Table(header_data_p2, colWidths=[370, 160])
    t_header_p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_header_p2)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Section B (Student's Soft Skills)</b>", cell_bold))
    story.append(Spacer(1, 4))

    sec_b_data = [
        [Paragraph("<b>No.</b>", cell_center_bold), Paragraph("<b>Item & Description</b>", cell_bold),
         Paragraph("<b>1</b>", cell_center_bold), Paragraph("<b>2</b>", cell_center_bold),
         Paragraph("<b>3</b>", cell_center_bold), Paragraph("<b>4</b>", cell_center_bold), Paragraph("<b>5</b>", cell_center_bold)],
        [Paragraph("1", cell_center), Paragraph("<b>Dedication:</b> Positive attitude and work dedication.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("2", cell_center), Paragraph("<b>Cooperation:</b> Associate himself/herself with others in carrying out job.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("3", cell_center), Paragraph("<b>Discipline:</b> Willingness to conform to organization rule.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("4", cell_center), Paragraph("<b>Responsibility:</b> Honest, sincere, fair and caring attitude to others during training.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("5", cell_center), Paragraph("<b>Socialization:</b> Ability to socialize with different levels of staff in organization.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("6", cell_center), Paragraph("<b>Communication:</b> Ability to express ideas and orders in a clear and organized manner.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
        [Paragraph("7", cell_center), Paragraph("<b>Decision making capability:</b> Ability to make decision in achieving set goals.", cell_style),
         Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center), Paragraph("[ &nbsp; ]", cell_center)],
    ]
    t_sec_b = Table(sec_b_data, colWidths=[25, 335, 34, 34, 34, 34, 34])
    t_sec_b.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E5E7EB")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_sec_b)
    story.append(Spacer(1, 10))

    # Section C
    story.append(Paragraph("<b>Section C (Student's potential in the profession and overall comments)</b>", cell_bold))
    story.append(Paragraph("<i>(Supervisor is kindly requested to write up comments on student's potential and overall comment)</i>", cell_style))
    story.append(Spacer(1, 4))

    sec_c_box = [
        [Paragraph("<br/><br/><br/><br/><br/>", cell_style)],
        [Paragraph("<b>Will your organisation offer this intern a job?</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ &nbsp; ] Yes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ &nbsp; ] No", cell_style)]
    ]
    t_sec_c = Table(sec_c_box, colWidths=[530])
    t_sec_c.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_sec_c)

    # PAGE 3: Scoring & Signatures
    story.append(PageBreak())

    header_data_p3 = [
        [
            Paragraph("<b>ADDIS ABABA SCIENCE AND TECHNOLOGY UNIVERSITY</b><br/>COLLEGE OF ENGINEERING<br/>DEPARTMENT OF SOFTWARE ENGINEERING", header_title_style),
            Paragraph("<b>Document No.:</b> VPAA/DPT/OF/004<br/><b>Issue No.:</b> 1<br/><b>Page:</b> Page 3 of 3", header_sub_style)
        ]
    ]
    t_header_p3 = Table(header_data_p3, colWidths=[370, 160])
    t_header_p3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.grey),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_header_p3)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>FINAL SUPERVISOR SCORING & DEPARTMENTAL EVALUATION</b>", doc_title_style))
    story.append(Spacer(1, 8))

    score_data = [
        [Paragraph("<b>TOTAL MARK / 60</b>", cell_bold), Paragraph("<b>[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</b>", cell_center)],
        [Paragraph("<b>OVERALL STUDENT'S PERFORMANCE (TOTAL MARKS / 60 * 20)</b>", cell_bold), Paragraph("<b>[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</b>", cell_center)],
        [Paragraph("<b>Supervisor Name:</b> Mr. Naod (Director)<br/><b>Position & Official Stamp:</b><br/><br/><b>Signature and Date:</b> ____________________________________", cell_style),
         Paragraph("<br/><br/><b>Official Company Stamp</b>", cell_center)]
    ]
    t_score = Table(score_data, colWidths=[330, 200])
    t_score.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('BACKGROUND', (0,0), (-1,1), colors.HexColor("#EFF6FF")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_score)
    story.append(Spacer(1, 14))

    # Department only section
    story.append(Paragraph("<b>Only filled by the department:</b>", section_heading))
    story.append(Spacer(1, 4))

    dept_data = [
        [Paragraph("<b>Company Supervisor Overall Evaluation (40%)</b>", cell_bold), Paragraph("<b>Marks Awarded</b>", cell_center_bold)],
        [Paragraph("1. Student's Performance Overall Evaluation (20%)", cell_style), Paragraph("[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]", cell_center)],
        [Paragraph("2. Average of Student's Monthly (20%)", cell_style), Paragraph("[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]", cell_center)],
        [Paragraph("<b>Overall Mark (40%)</b>", cell_bold), Paragraph("<b>[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</b>", cell_center_bold)],
        [Paragraph("<b>Department Coordinator's Name:</b> __________________________________________________<br/><b>Signature & Official Stamp:</b> ____________________________ &nbsp;&nbsp;&nbsp;&nbsp; <b>Date:</b> ______________", cell_style),
         Paragraph("<br/><b>Department Official Stamp</b>", cell_center)]
    ]
    t_dept = Table(dept_data, colWidths=[360, 170])
    t_dept.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E5E7EB")),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor("#F9FAFB")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_dept)

    doc.build(story)
    print("Generated:", pdf_path)

if __name__ == "__main__":
    generate_form_02()
    generate_form_06()
    generate_form_04()
