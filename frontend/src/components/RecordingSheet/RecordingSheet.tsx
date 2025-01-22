// import { FormControl } from "@/@/components/ui/form";
import { Form } from '@/@/components/ui/form';
import { Label } from '@/@/components/ui/label';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/@/components/ui/sheet';
import { useToast } from '@/@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
	Inputs,
	Schedule,
	SchedulePresenter,
	ScheduleSection,
	Venue,
} from '@/types';
import React from 'react';
import { baseUrl, client, headers } from '../../lib/utils';
import { Input } from '../ui/input';

// zod and form imports / dependencies
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import DatePicker from '../DatePicker/DatePicker';
import AvailabilityField from '../forms/fields/AvailabilityField';
import EndTimeField from '../forms/fields/EndTimeField';
import LiveStreamField from '../forms/fields/LiveStreamField';
import PresenterField from '../forms/fields/PresenterField';
import RoomField from '../forms/fields/RoomField';
import RoomInputField from '../forms/fields/RoomInputField';
import StartTimeField from '../forms/fields/StartTimeField';
import { formSchema } from '../RecordingSheet/RecordingSheetUtils';
import {
	convertDateToDateString,
	getInputs,
	getPresenter,
	getSection,
	getVenue,
	removeSeconds,
} from '../Schedule/ScheduleFunctions';

interface RecordingProps {
	selectedId: Schedule;
	toggleVisibility: () => void; // Passes in toggle from parent component, updating state on component mount
}

export const RecordingSheet: React.FC<RecordingProps> = ({
	selectedId,
	toggleVisibility,
}) => {
	const [sections /* setSections */] = React.useState(selectedId.sections); // setSections unused at this time

	// recording name state for input box
	const [recording, setRecording] = React.useState({
		captureQuality: selectedId.captureQuality,
		daysOfWeek: selectedId.daysOfWeek,
		endDate: selectedId.endDate,
		endTime: selectedId.endTime,
		exclusionDates: selectedId.exclusionDates,
		externalId: selectedId.externalId,
		guestPresenter: selectedId.guestPresenter,
		id: selectedId.id,
		input1: selectedId.input1,
		input2: selectedId.input2,
		name: selectedId.name,
		presenter: selectedId.presenter || {
			fullName: '',
			userEmail: '',
			userExternalId: '',
			userId: '',
		},
		sections: sections,
		shouldAutoPublish: selectedId.shouldAutoPublish,
		shouldCaption: selectedId.shouldCaption,
		shouldRecurCapture: selectedId.shouldRecurCapture,
		shouldStreamLive: selectedId.shouldStreamLive,
		startDate: selectedId.startDate,
		startTime: selectedId.startTime,
		streamQuality: selectedId.streamQuality,
		venue: selectedId.venue,
		availability: sections[0].availability?.availability,
		availabilityDate: sections[0].availability?.concreteTime,
	});

	//
	const handleDeleteRecording = () => {
		deleteRecording(recording);
		window.location.reload(); // basic req to force page reload after submission
	};

	// Toast setup for save changes notification
	const { toast } = useToast();

	const updateRecording = async (recording: Schedule) => {
		// check recording data can be edited first
		const requestDate = Date.parse(recording.startDate || '1900-01-01');
		const today = Date.now();
		if (requestDate < today) {
			toast({
				title: `Unable to change recordings from the past`,
				description: `Date Error: Recording in past`,
				variant: 'destructive',
			});
			return;
		}
		// update request to echo 360
		await client
			.post(`/schedules/update`, recording, headers)
			.then(function (response) {
				// convert 201 status to success if response is successful
				const status = response.status == 201 ? 'Success!' : response.status;
				toast({
					title: `Form submission status: ${status}`,
					description: `${recording.name} - ${recording.startDate} - ${recording.startTime} - ${recording.endTime}`,
					variant: 'success',
				});
			})
			.catch(function (error) {
				console.log(error);
				// convert 400 status to failed if response is unsuccessful
				const status = error.status == 400 ? 'Failed' : error.status;
				toast({
					title: `Form submission status: ${status}`,
					description: `${error.code}: ${error.message}`,
					variant: 'destructive',
				});
			});
	};

	const deleteRecording = async (recording: Schedule) => {
		console.log('attempting to delete a recording');
		// check recording data can be edited first
		const requestDate = Date.parse(recording.startDate || '1900-01-01');
		const today = Date.now();
		if (requestDate < today) {
			toast({
				title: `Unable to delete recordings from the past`,
				description: `Date Error: Recording in past`,
				variant: 'destructive',
			});
			return;
		}
		// delete request to echo 360
		await client
			.delete(`/schedules/${recording.id}`, headers)
			.then(function (response) {
				// convert 201 status to success if response is successful
				const status = response.status == 201 ? 'Success!' : response.status;
				toast({
					title: `Form submission status: ${status}`,
					description: `${recording.name} - ${recording.startDate} - ${recording.startTime} - ${recording.endTime}`,
					variant: 'success',
				});
			})
			.catch(function (error) {
				console.log(error);
				// convert 400 status to failed if response is unsuccessful
				const status = error.status == 400 ? 'Failed' : error.status;
				toast({
					title: `Form submission status: ${status}`,
					description: `${error.code}: ${error.message}`,
					variant: 'destructive',
				});
			});
	};

	// onChange handler to update input box state
	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecording((prevState) => ({
			...prevState,
			name: event.target.value,
		}));
	};

	function convertStringToDate(date: string): Date {
		return new Date(date);
	}
	
	// A function to convert the selectedId availability options for the form input selectors
	function convertAvailabilityOptions(availability?: string): string {
		let output = availability;
		if (availability == 'Concrete') {
			output = 'Manual';
		}
		if (availability == 'Unavailable') {
			output = 'Never';
		}
		if (availability == undefined) {
			output = 'Immediate';
			return output;
		}
		return output;
	}

	// A function to convert the selectId input options for the form input selectors
	function parseInputs(input1: string | null, input2: string | null): string {
		let output = '[ADV] Audio/Display-1/Display-2';
		if (input1 == 'Video' && input2 == null) {
			output = '[AV] Audio/Display-1';
			return output;
		}
		if (input1 == 'Display' && input2 == null) {
			output = '[AD] Audio/Display-2';
			return output;
		}
		if (input1 == null && input2 == null) {
			output = '[A] Audio Only';
			return output;
		}

		return output;
	}

	const parsedInputs = parseInputs(recording.input1, recording.input2);

	// return undefined if field is not found in recording
	// required to meet formSchema validation criteria
	const startDate = recording.startDate
		? convertStringToDate(recording.startDate)
		: undefined;
	const availabilityDate = sections[0].availability?.concreteTime
		? convertStringToDate(sections[0].availability?.concreteTime)
		: undefined;
	const academicYear = sections[0].termName ? sections[0].termName : undefined;
	const sectionName = sections[0].sectionName
		? sections[0].sectionName
		: undefined;

	const defaultAvailability =
		sections.length > 0
			? convertAvailabilityOptions(sections[0].availability?.availability)
			: '';

	const defaultValues = {
		academic_year: academicYear,
		section: sectionName,
		occasion: '1',
		start_date: startDate,
		start_time: recording.startTime,
		end_time: recording.endTime,
		availability: defaultAvailability,
		availability_date: availabilityDate,
		live_stream_toggle: recording.shouldStreamLive,
		presenter: recording.presenter.userId,
		room: recording.venue.roomId,
		input: parsedInputs,
		capture_quality: recording.captureQuality,
		recording_title: recording.name,
		// stream_quality: streamQuality,
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const inputs: Inputs = getInputs(values.input);
		const presenter: SchedulePresenter = await getPresenter(
			values.presenter,
			baseUrl,
			headers
		);
		const sections: ScheduleSection = await getSection(
			selectedId.sections[0].sectionId,
			baseUrl,
			headers
		);
		const startDate: string = convertDateToDateString(values.start_date);
		const startTime: string = removeSeconds(values.start_time);
		const endTime: string = removeSeconds(values.end_time);
		const venue: Venue = await getVenue(values.room, baseUrl, headers);
		const schedule: Schedule = {
			captureQuality: values.capture_quality,
			endTime: endTime,
			id: selectedId.id,
			externalId: selectedId.externalId,
			input1: inputs.input1,
			input2: inputs.input2,
			name: values.recording_title,
			presenter: presenter,
			sections: [sections],
			shouldStreamLive: values.live_stream_toggle,
			startDate: startDate,
			startTime: startTime,
			streamQuality: values.capture_quality,
			venue: venue,
		};

		try {
			updateRecording(schedule);
			console.log(values);
			console.log(schedule);
		} catch (error) {
			console.error('Form submission error', error);
		}
	}

	// state handling for selected recording - disable fields if in past
	const [isInPast, setIsInPast] = React.useState<boolean>(false);

	function isSelectedIdInPast(startDate: string | undefined): void {
		setIsInPast(false);
		if (!startDate) {
			setIsInPast(false);
		} else {
			const dateString = Date.parse(startDate);
			if (dateString <= Date.now()) {
				setIsInPast(true);
			}
		}
	}
	// set state to disable fields if recording is in the past and unable to change
	React.useEffect(() => {
		isSelectedIdInPast(selectedId.startDate);
	}, [selectedId, isInPast]);

	return (
		<div>
			<Sheet key="right" defaultOpen={true} onOpenChange={toggleVisibility}>
				<SheetContent
					className="w-[540px] sm:w-[800px]"
					style={{ maxWidth: '50vw' }}
				>
					<SheetHeader>
						<SheetTitle>Edit recording</SheetTitle>
						<SheetDescription>
							{isInPast
								? 'This recording is in the past. You will be unable to make changes.'
								: "Make changes to your recording here. Click save when you're done."}
						</SheetDescription>
					</SheetHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="recordingId" className="text-right">
										ID
									</Label>
									<Input
										id="recordingId"
										value={recording.id}
										className="col-span-3"
										disabled
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">
										Name
									</Label>
									<Input
										id="name"
										value={recording.name}
										className="col-span-3"
										onChange={handleChangeName}
										disabled={isInPast}
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="start-date" className="text-right col-span-1">
										Date
									</Label>
									<div className="col-span-3">
										<DatePicker fieldName="start_date" disabled={isInPast} />
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="start-time" className="text-right">
										Start Time
									</Label>
									<div className="col-span-3">
										<StartTimeField
											messageDisabled={true}
											disabled={isInPast}
										/>
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="end-time" className="text-right">
										End Time
									</Label>
									<div className="col-span-3">
										<EndTimeField messageDisabled={true} disabled={isInPast} />
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="availability" className="text-right">
										Availability
									</Label>
									<div className="col-span-3">
										<AvailabilityField
											messageDisabled={true}
											disabled={isInPast}
										/>
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="availability-date" className="text-right">
										Availability Date
									</Label>
									<div className="col-span-3">
										<DatePicker
											fieldName="availability_date"
											disabled={isInPast}
										/>
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="live-stream" className="text-right">
										Live Stream
									</Label>
									<div className="col-span-3 ">
										<LiveStreamField
											messageDisabled={true}
											disabled={isInPast}
										/>
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="presenter" className="text-right">
										Presenter
									</Label>
									<div className="col-span-3">
										<PresenterField
											messageDisabled={true}
											userId={recording.presenter.userId}
											disabled={isInPast}
										/>
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="room" className="text-right">
										Room
									</Label>
									<div className="col-span-3">
										<RoomField messageDisabled={true} disabled={isInPast} />
									</div>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="inputs" className="text-right">
										Inputs
									</Label>
									<div className="col-span-3">
										<RoomInputField
											messageDisabled={true}
											disabled={isInPast}
										/>
									</div>
								</div>
							</div>
						</form>
					</Form>
					<SheetFooter>
						<div className="form-buttons grid grid-cols-3 items-center gap-4 mt-4">
							<Button
								type="button"
								name="delete"
								variant="destructive"
								onClick={handleDeleteRecording}
								className=""
							>
								Delete Recording
							</Button>
							<SheetClose asChild>
								<Button
									type="submit"
									onClick={form.handleSubmit(onSubmit)}
									disabled={isInPast}
								>
									Save changes
								</Button>
							</SheetClose>
						</div>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};
